import { cloneAndClean } from './index'

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
          pointReferences[lotGeoSystemeId]
            .map(coordonnee => coordonnee.toString().replace('.', ','))
            .join(';')
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
  etape = cloneAndClean(etape)

  etape.titreDemarcheId = demarcheId

  if (etape.type) {
    etape.typeId = etape.type.id

    delete etape.type
  }

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

  etape.documents.forEach(document => {
    document.titreEtapeId = etape.id

    document.typeId = document.type.id
    document.fichierNouveau = null

    delete document.type
    delete document.modification
    delete document.suppression
  })

  delete etape.pays
  delete etape.modification
  delete etape.suppression
  delete etape.points
  delete etape.geojsonPoints
  delete etape.geojsonMultiPolygon
  delete etape.justificatifs
  delete etape.justificatifsAssociation

  return etape
}

export { etapeEditFormat, etapeGroupesBuild }
