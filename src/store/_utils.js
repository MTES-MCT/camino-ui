const paramsBuild = (filterIds, preferences) => {
  // récupère les paramètres depuis les préférences utilisateurs
  const params = filterIds.reduce((params, id) => {
    const i = id.replace(/Id/g, '')

    const values =
      preferences.filtres[i] &&
      preferences.filtres[i].split(',').map(v => v.replace(/^"(.*)"$/, '$1'))

    return values && values.length
      ? Object.assign(params, { [id]: values })
      : params
  }, {})

  return params
}

export { paramsBuild }
