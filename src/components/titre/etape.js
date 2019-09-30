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

const groupeBuild = (points, geoSystemeOpposableId) =>
  points.reduce(
    (
      { groupes, geoSystemes, lotPointIndex },
      { nom, description, point, contour, groupe, references, lot }
    ) => {
      const { pointReferences, pointGeoSystemes } = referencesBuild(references)

      const lotGeoSystemeId =
        geoSystemeOpposableId || Object.keys(pointGeoSystemes)[0]

      if (!lot || !lotPointIndex) {
        groupes[groupe - 1] = groupes[groupe - 1] || []
        groupes[groupe - 1][contour - 1] =
          groupes[groupe - 1][contour - 1] || []
        groupes[groupe - 1][contour - 1][point - 1] = {
          nom,
          groupe,
          contour,
          point,
          description,
          lot,
          references: lot
            ? [pointReferences[lotGeoSystemeId].join(',')]
            : pointReferences
        }
      } else {
        groupes[groupe - 1][contour - 1][lotPointIndex].references.push(
          pointReferences[lotGeoSystemeId].join(',')
        )
      }

      lotPointIndex = lot ? point - 1 : null

      return {
        groupes,
        geoSystemes: Object.assign(geoSystemes, pointGeoSystemes),
        lotPointIndex
      }
    },
    { groupes: [], geoSystemes: {}, lotPointIndex: null }
  )

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
      ? etape[prop].reduce((r, { id }) => (id ? [...r, id] : r), [])
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

  etape.visas = etape.visas
    ? etape.visas.map((texte, id) => ({
        id,
        texte
      }))
    : []

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
