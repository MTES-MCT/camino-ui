import { jsonTypenameOmit, dateFormat } from '../../utils/index'

const referencesBuild = references =>
  references.reduce(
    (
      { pointGeoSystemes, pointReferences },
      { geoSysteme, unite, coordonnees }
    ) => {
      pointGeoSystemes[geoSysteme.id] = {
        id: geoSysteme.id,
        nom: geoSysteme.nom,
        uniteId: unite.id,
        uniteType: unite.type
      }

      pointReferences[geoSysteme.id] = [coordonnees.x, coordonnees.y]

      return { pointGeoSystemes, pointReferences }
    },
    { pointGeoSystemes: {}, pointReferences: {} }
  )

const geoSystemeOpposableIdFind = references => {
  const referenceOpposable = references.find(r => r.opposable)

  return referenceOpposable ? referenceOpposable.geoSysteme.id : null
}

const groupeBuild = (points, geoSystemeOpposableId) => {
  const pointsOrdered = points.sort((a, b) => {
    if (a.groupe > b.groupe) return 1
    if (a.groupe < b.groupe) return -1

    if (a.contour > b.contour) return 1
    if (a.contour < b.contour) return -1

    if (a.point > b.point) return 1
    if (a.point < b.point) return -1

    return 0
  })

  return pointsOrdered.reduce(
    (
      {
        groupes,
        geoSystemes,
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      },
      { nom, description, point, contour, groupe, references, lot, subsidiaire }
    ) => {
      const { pointReferences, pointGeoSystemes } = referencesBuild(references)

      const lotGeoSystemeId =
        geoSystemeOpposableId || Object.keys(pointGeoSystemes)[0]

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

        groupes[groupe - 1][contour - 1].push({
          nom,
          description,
          lot,
          subsidiaire,
          references: lot
            ? [pointReferences[lotGeoSystemeId].join(',')]
            : pointReferences
        })

        pointIndex = lot ? groupes[groupe - 1][contour - 1].length : null
        lotCurrent = lot
        contourIndexPrevious = contour
        groupeIndexPrevious = groupe
      }

      return {
        groupes,
        geoSystemes: Object.assign(geoSystemes, pointGeoSystemes),
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      }
    },
    {
      groupes: [],
      geoSystemes: {},
      lotCurrent: null,
      pointIndex: 0,
      contourIndexPrevious: 1,
      groupeIndexPrevious: 1
    }
  )
}

const etapeGroupesBuild = points => {
  const geoSystemeOpposableId = geoSystemeOpposableIdFind(points[0].references)

  const { groupes, geoSystemes } = groupeBuild(points, geoSystemeOpposableId)

  return {
    groupes,
    geoSystemes: Object.keys(geoSystemes).map(
      geoSystemeId => geoSystemes[geoSystemeId]
    ),
    geoSystemeOpposableId
  }
}

const etapeEditFormat = (etape, demarcheId) => {
  etape = jsonTypenameOmit(etape)

  etape.titreDemarcheId = demarcheId

  etape.typeId = etape.type.id
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

  if (etape.date) {
    etape.date = dateFormat(etape.date)
  }

  if (etape.dateDebut) {
    etape.dateDebut = dateFormat(etape.dateDebut)
  }

  if (etape.dateFin) {
    etape.dateFin = dateFormat(etape.dateFin)
  }

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  etape.engagementDeviseId = etape.engagementDevise && etape.engagementDevise.id
  delete etape.engagementDevise

  etape.volumeUniteId = etape.volumeUnite && etape.volumeUnite.id
  delete etape.volumeUnite

  if (etape.points && etape.points.length) {
    const { groupes, geoSystemes, geoSystemeOpposableId } = etapeGroupesBuild(
      etape.points
    )

    etape.groupes = groupes
    etape.geoSystemes = geoSystemes
    etape.geoSystemeOpposableId = geoSystemeOpposableId
  } else {
    etape.groupes = []
    etape.geoSystemes = []
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

export { etapeEditFormat }
