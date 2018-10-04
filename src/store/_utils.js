const titreFormat = t => {
  const perimetres = []

  t.demarches &&
    t.demarches.forEach(d => {
      d.etapes &&
        d.etapes.forEach(e => {
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
        })
    })

  return Object.assign(
    {
      perimetres
    },
    t
  )
}

const metaFormat = s => {
  const checked = true
  return Object.assign({ checked }, s)
}

export { titreFormat, metaFormat }
