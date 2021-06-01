const etapeHeritageBuild = (stateEtape, apiEtape, etapeType) => {
  const newEtape = {
    id: stateEtape.id,
    date: stateEtape.date,
    typeId: apiEtape.typeId,
    statutId: '',
    incertitudes: { date: stateEtape.incertitudes.date },
    titreDemarcheId: stateEtape.titreDemarcheId
  }

  if (apiEtape.sections) {
    newEtape.sections = apiEtape.sections
  }

  if (stateEtape.documents) {
    const documentsTypesIds = etapeType.documentsTypes.map(({ id }) => id)
    newEtape.documents = stateEtape.documents.filter(document =>
      documentsTypesIds.includes(document.typeId)
    )
  }

  if (stateEtape.justificatifs) {
    const justificatifsTypesIds = etapeType.justificatifsTypes.map(
      ({ id }) => id
    )
    newEtape.justificatifs = stateEtape.justificatifs.filter(justificatif =>
      justificatifsTypesIds.includes(justificatif.typeId)
    )
  }

  // si
  // - on crée une nouvelle étape fondamentale
  // - on change le type d'étape (non-fondamentale -> fondamentale)
  // alors la nouvelle étape récupère les propriété de l'API
  if (!stateEtape.heritageProps && apiEtape.heritageProps) {
    newEtape.heritageProps = apiEtape.heritageProps
    newEtape.duree = apiEtape.duree
    newEtape.dateDebut = apiEtape.dateDebut
    newEtape.dateFin = apiEtape.dateFin
    newEtape.surface = apiEtape.surface
    newEtape.titulaires = apiEtape.titulaires
    newEtape.amodiataires = apiEtape.amodiataires
    newEtape.substances = apiEtape.substances
    newEtape.groupes = apiEtape.groupes
    newEtape.geoSystemeIds = apiEtape.geoSystemeIds
    newEtape.geoSystemeOpposableId = apiEtape.geoSystemeOpposableId
  }
  // si on change le type d'étape (fondamentale -> fondamentale)
  // alors on garde les propriétés actuelles
  else if (stateEtape.heritageProps && apiEtape.heritageProps) {
    newEtape.heritageProps = stateEtape.heritageProps
    newEtape.duree = stateEtape.duree
    newEtape.dateDebut = stateEtape.dateDebut
    newEtape.dateFin = stateEtape.dateFin
    newEtape.surface = stateEtape.surface
    newEtape.titulaires = stateEtape.titulaires
    newEtape.amodiataires = stateEtape.amodiataires
    newEtape.substances = stateEtape.substances
    newEtape.groupes = stateEtape.groupes
    newEtape.geoSystemeIds = stateEtape.geoSystemeIds
    newEtape.geoSystemeOpposableId = stateEtape.geoSystemeOpposableId
  }

  if (
    apiEtape.heritageContenu &&
    Object.keys(apiEtape.heritageContenu).length
  ) {
    Object.keys(apiEtape.heritageContenu).forEach(sectionId => {
      if (Object.keys(apiEtape.heritageContenu[sectionId]).length) {
        Object.keys(apiEtape.heritageContenu[sectionId]).forEach(elementId => {
          if (!newEtape.contenu) {
            newEtape.contenu = {}
          }

          if (!newEtape.contenu[sectionId]) {
            newEtape.contenu[sectionId] = {}
          }

          if (!newEtape.heritageContenu) {
            newEtape.heritageContenu = {}
          }

          if (!newEtape.heritageContenu[sectionId]) {
            newEtape.heritageContenu[sectionId] = {}
          }

          if (
            stateEtape.heritageContenu &&
            stateEtape.heritageContenu[sectionId] &&
            stateEtape.heritageContenu[sectionId][elementId]
          ) {
            if (
              stateEtape.contenu &&
              stateEtape.contenu[sectionId] &&
              stateEtape.contenu[sectionId][elementId]
            ) {
              newEtape.contenu[sectionId][elementId] =
                stateEtape.contenu[sectionId][elementId]
            }

            newEtape.heritageContenu[sectionId][elementId] =
              stateEtape.heritageContenu[sectionId][elementId]
          } else {
            if (apiEtape.contenu[sectionId]) {
              newEtape.contenu[sectionId][elementId] =
                apiEtape.contenu[sectionId][elementId]
            }

            newEtape.heritageContenu[sectionId][elementId] =
              apiEtape.heritageContenu[sectionId][elementId]
          }
        })
      }
    })
  }

  return newEtape
}

export { etapeHeritageBuild }
