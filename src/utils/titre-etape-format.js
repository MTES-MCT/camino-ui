import { dureeBuild, pointsBuild } from './titre-etape-save'

const etapeFormat = (etapeEdited, metas) => {
  const etape = {}

  if (etapeEdited.typeId) {
    etape.type = metas.etapesTypes.find(et => et.id === etapeEdited.typeId)
  }

  if (etape.type && etapeEdited.statutId) {
    etape.statut = etape.type.etapesStatuts.find(
      es => es.id === etapeEdited.statutId
    )
  }

  if (etape.duree && (etape.duree.ans || etape.duree.mois)) {
    etape.duree = dureeBuild(etape.duree.ans, etape.duree.mois)
  }

  if (etapeEdited.substances.length) {
    etape.substances = etapeEdited.substances.map(s =>
      metas.substances.find(({ id }) => id === s.id)
    )
  }

  if (etapeEdited.titulaires.length) {
    etape.titulaires = etapeEdited.titulaires.map(s =>
      metas.entreprises.find(({ id }) => id === s.id)
    )
  }

  if (etapeEdited.amodiataires.length) {
    etape.amodiataires = etapeEdited.amodiataires.map(s =>
      metas.entreprises.find(({ id }) => id === s.id)
    )
  }

  if (
    etapeEdited.geoSystemeIds &&
    etapeEdited.geoSystemeIds.length &&
    etapeEdited.groupes.length
  ) {
    etape.points = pointsBuild(
      etapeEdited.groupes,
      etapeEdited.geoSystemeIds,
      etapeEdited.geoSystemeOpposableId || etapeEdited.geoSystemeIds[0]
    )

    etape.points.forEach(p => {
      p.references.forEach(r => {
        r.geoSysteme = metas.geoSystemes.find(g => g.id === r.geoSystemeId)
      })
    })
  }

  if (etape.type && etapeEdited.documents?.length) {
    etape.documents = JSON.parse(JSON.stringify(etapeEdited.documents))

    etape.documents.forEach(d => {
      d.type = etape.type.documentsTypes.find(dt => dt.id === d.typeId)
      d.suppression = true
      d.modification = true
    })
  }

  return etape
}

export { etapeFormat }
