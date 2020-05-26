// supprime les id vides
const idsClean = value => {
  if (!value) return null

  value = value.filter(v => v !== '')

  return value.length ? value : null
}

export { idsClean }
