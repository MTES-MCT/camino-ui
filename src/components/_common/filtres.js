// supprime les valeurs vides
const valuesClean = values => {
  if (!values) return []

  values = values.filter(v => v !== '')

  return values
}

export { valuesClean }
