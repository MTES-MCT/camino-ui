import { jsonTypenameOmit } from '../../utils/index'

const referencesBuild = references =>
  references.reduce(
    (
      { pointGeoSystemeIndex, pointReferences },
      { geoSysteme, coordonnees }
    ) => {
      pointGeoSystemeIndex[geoSysteme.id] = true

      pointReferences[geoSysteme.id] = [coordonnees.x, coordonnees.y]

      return { pointGeoSystemeIndex, pointReferences }
    },
    { pointGeoSystemeIndex: {}, pointReferences: {} }
  )

const geoSystemeOpposableIdFind = references => {
  const referenceOpposable = references.find(r => r.opposable)

  return referenceOpposable ? referenceOpposable.geoSysteme.id : null
}

const groupeBuild = (points, geoSystemeOpposableId) =>
  points.reduce(
    (
      {
        groupes,
        geoSystemeIndex,
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      },
      { nom, description, contour, groupe, references, lot, subsidiaire }
    ) => {
      const { pointReferences, pointGeoSystemeIndex } = referencesBuild(
        references
      )

      const lotGeoSystemeId =
        geoSystemeOpposableId || Object.keys(pointGeoSystemeIndex)[0]

      if (
        lot &&
        lotCurrent &&
        lotCurrent === lot &&
        groupe === groupeIndexPrevious &&
        contour === contourIndexPrevious
      ) {
        groupes[groupe - 1][contour - 1][pointIndex - 1].references.push(
          pointReferences[lotGeoSystemeId].join(',')
        )
      } else {
        if (!groupes[groupe - 1]) {
          groupes[groupe - 1] = []
        }

        if (!groupes[groupe - 1][contour - 1]) {
          groupes[groupe - 1][contour - 1] = []
        }

        const point = {
          description,
          lot,
          subsidiaire,
          references: lot
            ? [pointReferences[lotGeoSystemeId].join(',')]
            : pointReferences
        }

        if (!lot) {
          point.nom = nom
        }

        groupes[groupe - 1][contour - 1].push(point)

        pointIndex = lot ? groupes[groupe - 1][contour - 1].length : null
        lotCurrent = lot
        contourIndexPrevious = contour
        groupeIndexPrevious = groupe
      }

      return {
        groupes,
        geoSystemeIndex: Object.assign(geoSystemeIndex, pointGeoSystemeIndex),
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      }
    },
    {
      groupes: [],
      geoSystemeIndex: {},
      lotCurrent: null,
      pointIndex: 0,
      contourIndexPrevious: 1,
      groupeIndexPrevious: 1
    }
  )

const etapeGroupesBuild = points => {
  const geoSystemeOpposableId = geoSystemeOpposableIdFind(points[0].references)

  const { groupes, geoSystemeIndex } = groupeBuild(
    points,
    geoSystemeOpposableId
  )

  return {
    groupes,
    geoSystemeIds: Object.keys(geoSystemeIndex),
    geoSystemeOpposableId
  }
}

const etapeEditFormat = (etape, demarcheId) => {
  etape = jsonTypenameOmit(etape)

  etape.titreDemarcheId = demarcheId

  etape.typeId = etape.type.id
  etape.typeIdOriginal = etape.type.id
  delete etape.type

  etape.statutId = etape.statut.id
  delete etape.statut

  const joinTable = [
    'titulaires',
    'amodiataires',
    'administrations',
    'substances'
  ]

  joinTable.forEach(prop => {
    etape[`${prop}Ids`] = etape[prop]
      ? etape[prop].reduce((r, { id }) => {
          if (id) r.push(id)

          return r
        }, [])
      : []

    delete etape[prop]
  })

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  etape.engagementDeviseId = etape.engagementDevise && etape.engagementDevise.id
  delete etape.engagementDevise

  etape.volumeUniteId = etape.volumeUnite && etape.volumeUnite.id
  delete etape.volumeUnite

  if (etape.points && etape.points.length) {
    const { groupes, geoSystemeIds, geoSystemeOpposableId } = etapeGroupesBuild(
      etape.points
    )

    etape.groupes = groupes
    etape.geoSystemeIds = geoSystemeIds
    etape.geoSystemeOpposableId = geoSystemeOpposableId
  } else {
    etape.groupes = []
    etape.geoSystemeIds = []
    etape.geoSystemeOpposableId = null
  }

  if (!etape.incertitudes) {
    etape.incertitudes = {}
  }

  if (!etape.contenu) {
    etape.contenu = {}
  }

  delete etape.pays
  delete etape.points
  delete etape.geojsonPoints
  delete etape.geojsonMultiPolygon
  delete etape.documents

  return etape
}

export { etapeEditFormat, etapeGroupesBuild }
