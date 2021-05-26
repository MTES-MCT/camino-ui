import { dureeBuild, pointsBuild } from './titre-etape-save'

const etapeFormat = (etapeEdited, metas) => {
  const etape = {
    id: etapeEdited.id,
    modification: false,

    dateDebut: etapeEdited.dateDebut,
    dateFin: etapeEdited.dateFin,
    surface: etapeEdited.surface,

    incertitudes: etapeEdited.incertitudes,
    contenu: etapeEdited.contenu,
    heritageContenu: etapeEdited.heritageContenu,
    heritageProps: etapeEdited.heritageProps
  }

  if (etapeEdited.typeId) {
    etape.type = metas.etapesTypes.find(et => et.id === etapeEdited.typeId)
  }

  if (etape.type && etapeEdited.statutId) {
    etape.statut = etape.type.etapesStatuts.find(
      es => es.id === etapeEdited.statutId
    )
  }

  if (etapeEdited.duree) {
    etape.duree = dureeBuild(etapeEdited.duree.ans, etapeEdited.duree.mois)
  }

  if (etapeEdited.substances.length) {
    etape.substances = etapeEdited.substances
      .filter(({ id }) => id)
      .map(s => metas.substances.find(({ id }) => id === s.id))
  }

  if (etapeEdited.titulaires.length) {
    etape.titulaires = etapeEdited.titulaires
      .filter(({ id }) => id)
      .map(s => metas.entreprises.find(({ id }) => id === s.id))
  }

  if (etapeEdited.amodiataires.length) {
    etape.amodiataires = etapeEdited.amodiataires
      .filter(({ id }) => id)
      .map(s => metas.entreprises.find(({ id }) => id === s.id))
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
    const documentsTypes = etape.type.documentsTypes

    etape.documents = etapeEdited.documents.filter(d => {
      const documentType = documentsTypes.find(dt => dt.id === d.typeId)

      return (
        d.date &&
        (documentType.optionnel ||
          !!((d.fichier || d.fichierNouveau) && d.fichierTypeId))
      )
    })

    etape.documents.forEach(d => {
      d.type = etape.type.documentsTypes.find(dt => dt.id === d.typeId)
      d.suppression = true
      d.modification = true
    })
  }

  if (etape.type && etapeEdited.justificatifs?.length) {
    const documents = etape.titulaires
      .concat(etape.amodiataires)
      .filter(e => !!e)
      .flatMap(entreprise => entreprise.documents)

    etape.justificatifs = etapeEdited.justificatifs
      .filter(({ id }) => id)
      .map(({ id }) => documents.find(d => d.id === id))
  }

  return etape
}

export { etapeFormat }
