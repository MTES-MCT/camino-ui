import { cloneAndClean } from './index'

const referencesBuild = references =>
  references.reduce(
    (
      { pointGeoSystemesIndex, pointReferences },
      { geoSysteme, coordonnees, id }
    ) => {
      pointGeoSystemesIndex[geoSysteme.id] = geoSysteme

      pointReferences[geoSysteme.id] = { ...coordonnees }

      if (id) {
        pointReferences[geoSysteme.id].id = id
      }

      return { pointGeoSystemesIndex, pointReferences }
    },
    { pointGeoSystemesIndex: {}, pointReferences: {} }
  )

const geoSystemeOpposableIdFind = references => {
  const referenceOpposable = references.find(r => r.opposable)

  return referenceOpposable ? referenceOpposable.geoSysteme.id : ''
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
      { nom, description, contour, groupe, references, lot, subsidiaire, id }
    ) => {
      const { pointReferences, pointGeoSystemesIndex } =
        referencesBuild(references)

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
          pointReferences[lotGeoSystemeId]
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
          references: lot ? [pointReferences[lotGeoSystemeId]] : pointReferences
        }

        if (id) {
          point.id = id
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

const etapePointsFormat = (etape, points) => {
  if (points && points.length) {
    const { groupes, geoSystemes, geoSystemeOpposableId } =
      etapeGroupesBuild(points)

    etape.groupes = groupes
    etape.geoSystemeIds = geoSystemes.map(({ id }) => id)
    etape.geoSystemeOpposableId = geoSystemeOpposableId
  } else {
    etape.groupes = []
    etape.geoSystemeIds = []
    etape.geoSystemeOpposableId = null
  }
  return etape
}

const etapeEditFormat = etape => {
  etape = cloneAndClean(etape)

  if (etape.statut) {
    etape.statutId = etape.statut.id
    delete etape.statut
  } else {
    etape.statutId = ''
  }

  delete etape.administrations

  const entreprisesPropIds = ['titulaires', 'amodiataires']

  entreprisesPropIds.forEach(propId => {
    if (etape[propId]) {
      etape[propId] = etape[propId].map(({ id, operateur }) => ({
        id,
        operateur
      }))
    } else {
      etape[propId] = []
    }
  })

  if (etape.substances) {
    etape.substances = etape.substances.map(({ id }) => ({
      id
    }))
  } else {
    etape.substances = []
  }

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  etape = etapePointsFormat(etape, etape.points)

  if (!etape.incertitudes) {
    etape.incertitudes = {}
  }

  if (!etape.contenu) {
    etape.contenu = {}
  }

  if (!etape.documents) {
    etape.documents = []
  } else {
    etape.documents = etape.documents.map(documentEtapeFormat)
  }

  if (!etape.justificatifs) {
    etape.justificatifs = []
  }

  delete etape.pays
  delete etape.modification
  delete etape.points
  delete etape.geojsonPoints
  delete etape.geojsonMultiPolygon

  return etape
}

const documentEtapeFormat = document => {
  document.typeId = document.type.id
  document.fichierNouveau = null

  return document
}
export {
  etapeEditFormat,
  etapeGroupesBuild,
  documentEtapeFormat,
  etapePointsFormat
}
