const activiteContenuFormat = (contenu, sections) =>
  contenu
    ? sections.reduce((resSections, section) => {
        const r = section.elements.reduce((resElements, element) => {
          if (
            !contenu[section.id] ||
            contenu[section.id][element.id] === undefined
          ) {
            resElements[`${section.id}_${element.id}`] = ''

            return resElements
          }

          resElements[`${section.id}_${element.id}`] = Array.isArray(
            contenu[section.id][element.id]
          )
            ? contenu[section.id][element.id].join(';')
            : JSON.stringify(contenu[section.id][element.id])

          return resElements
        }, {})

        return Object.assign(resSections, r)
      }, {})
    : {}

const activitesFormatCsv = (activites, activitesTypesSections) =>
  activites.map(activite => {
    const contenu = activiteContenuFormat(
      activite.contenu,
      activitesTypesSections
    )

    return Object.assign(
      {
        id: activite.id,
        titre_id: activite.titre.id,
        type: activite.type.nom,
        statut: activite.statut.nom,
        annee: activite.annee,
        periode: activite.periode.nom,
        frequence_periode_id: activite.frequencePeriodeId
      },
      contenu
    )
  })

export default activitesFormatCsv
