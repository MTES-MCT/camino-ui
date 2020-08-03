const etapeSaveFormat = etape => {
  etape = JSON.parse(JSON.stringify(etape))

  delete etape.typeIdOriginal

  if (etape.duree.ans || etape.duree.mois) {
    etape.duree =
      (etape.duree.ans ? etape.duree.ans * 12 : 0) +
      (etape.duree.mois ? etape.duree.mois : 0)
  } else {
    etape.duree = null
  }

  const props = ['date', 'surface', 'duree']

  props.forEach(prop => {
    if (etape[prop] === '') {
      etape[prop] = null
    }
  })

  return etape
}

export { etapeSaveFormat }
