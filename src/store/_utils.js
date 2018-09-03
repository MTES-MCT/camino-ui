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
            e.substances.forEach(s => {
              if (
                !s.connexe &&
                !substancesPrincipales.find(su => su.id === s.id)
              ) {
                substancesPrincipales.push(s)
              } else if (
                s.connexe &&
                !substancesConnexes.find(su => su.id === s.id)
              ) {
                substancesConnexes.push(s)
              }
            })
          }

          if (e.titulaires) {
            e.titulaires.forEach(t => {
              if (!titulaires.find(ti => ti.id === t.id)) {
                titulaires.push(t)
              }
            })
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
