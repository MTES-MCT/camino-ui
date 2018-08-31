const titreFormat = t => {
  const perimetres = []
  const substancesPrincipales = []
  const substancesConnexes = []
  const titulaires = []
  const phases = []

  t.demarches &&
    t.demarches.forEach(d => {
      d.etapes &&
        d.etapes.forEach(e => {
          if (
            d.statut.id === 'acc' &&
            e.type.id === 'dpu' &&
            e.statut.id === 'ter'
          ) {
            if (
              d.type.nom === 'octroi' ||
              d.type.nom === 'prolongation' ||
              d.type.nom === 'prolongation 1' ||
              d.type.nom === 'prolongation 2'
            ) {
              phases.push({
                nom: d.type.nom,
                duree: e.duree,
                date: e.date
              })
            }
          }

          if (e.geojsonPoints) {
            perimetres.push({
              date: e.date,
              demarche: {
                type: d.type,
                statut: d.statut
              },
              geojsonMultiPolygon: e.geojsonMultiPolygon,
              geojsonPoints: e.geojsonPoints,
              surface: e.surface
            })
          }

          if (e.substances) {
            substancesPrincipales.push(...e.substances.filter(s => !s.connexe))
            substancesConnexes.push(...e.substances.filter(s => s.connexe))
          }

          if (e.titulaires) {
            titulaires.push(...e.titulaires)
          }
        })
    })

  return Object.assign(
    {
      perimetres,
      substancesPrincipales,
      substancesConnexes,
      titulaires,
      phases
    },
    t
  )
}

const metaFormat = s => {
  const checked = true
  return Object.assign({ checked }, s)
}

export { titreFormat, metaFormat }
