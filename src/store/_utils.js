// récupère les paramètres depuis les préférences utilisateurs
const paramsBuild = (apiParams, preferences) =>
  apiParams.reduce((params, { id, type }) => {
    let v = preferences[id]

    if (type === 'strings' || type === 'objects') {
      v = v && v.length ? v : null
    } else if (type === 'number') {
      v = v ? Number(v) : null
    } else if (type === 'numbers') {
      v = v && v.length ? v.map(Number) : null
    } else {
      v = v ? v.toString() : null
    }

    if (v) {
      params[id] = v
    }

    return params
  }, {})

export { paramsBuild }
