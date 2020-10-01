import { jsonTypenameOmit } from '../../utils/index'

const referencesBuild = references =>
  references.reduce(
    (
      { pointGeoSystemesIndex, pointReferences },
      { geoSysteme, coordonnees }
    ) => {
      pointGeoSystemesIndex[geoSysteme.id] = geoSysteme

      pointReferences[geoSysteme.id] = [coordonnees.x, coordonnees.y]

      return { pointGeoSystemesIndex, pointReferences }
    },
    { pointGeoSystemesIndex: {}, pointReferences: {} }
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
        geoSystemesIndex,
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      },
      { nom, description, contour, groupe, references, lot, subsidiaire }
    ) => {
      const { pointReferences, pointGeoSystemesIndex } = referencesBuild(
        references
      )

      const lotGeoSystemeId =
        geoSystemeOpposableId || Object.keys(pointGeoSystemesIndex)[0]

      if (
        lot &&
        lotCurrent &&
        lotCurrent === lot &&
        groupe === groupeIndexPrevious &&
        contour === contourIndexPrevious
      ) {
        groupes[groupe - 1][contour - 1][pointIndex - 1].references.push(
          lot
            ? pointReferences[lotGeoSystemeId]
                .map(coordonnee => coordonnee.toString().replace('.', ','))
                .join(';')
            : pointReferences[lotGeoSystemeId].join(',')
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
            ? [
                pointReferences[lotGeoSystemeId]
                  .map(coordonnee => coordonnee.toString().replace('.', ','))
                  .join(';')
              ]
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
        geoSystemesIndex: Object.assign(
          geoSystemesIndex,
          pointGeoSystemesIndex
        ),
        lotCurrent,
        pointIndex,
        contourIndexPrevious,
        groupeIndexPrevious
      }
    },
    {
      groupes: [],
      geoSystemesIndex: {},
      lotCurrent: null,
      pointIndex: 0,
      contourIndexPrevious: 1,
      groupeIndexPrevious: 1
    }
  )

const etapeGroupesBuild = points => {
  const geoSystemeOpposableId = geoSystemeOpposableIdFind(points[0].references)

  const { groupes, geoSystemesIndex } = groupeBuild(
    points,
    geoSystemeOpposableId
  )

  return {
    groupes,
    geoSystemes: Object.keys(geoSystemesIndex).map(id => geoSystemesIndex[id]),
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
    etape[prop] = etape[prop]
      ? etape[prop].reduce((r, { id }) => {
          if (id) r.push({ id })

          return r
        }, [])
      : []
  })

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  if (etape.points && etape.points.length) {
    const { groupes, geoSystemes, geoSystemeOpposableId } = etapeGroupesBuild(
      etape.points
    )

    etape.groupes = groupes
    etape.geoSystemeIds = geoSystemes.map(({ id }) => id)
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
  delete etape.modification
  delete etape.suppression
  delete etape.points
  delete etape.geojsonPoints
  delete etape.geojsonMultiPolygon
  delete etape.documents
  delete etape.justificatifs
  delete etape.justificatifsAssociation

  return etape
}

export { etapeEditFormat, etapeGroupesBuild }
