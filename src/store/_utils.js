// récupère les paramètres depuis les préférences utilisateurs
const paramsBuild = (apiParams, preferences) =>
  apiParams.reduce((params, { id, type }) => {
    let v = preferences[id]

    if (type === 'array' || type === 'objects') {
      v = v && v.length ? v : null
    } else if (type === 'number') {
      v = v ? Number(v) : null
    } else if (type === 'numbers') {
      v = v && v.length ? v.reduce((acc, e) => [...acc, Number(e)], []) : null
    } else {
      v = v ? v.toString() : null
    }

    if (v) {
      params = Object.assign(params, { [id]: v })
    }

    return params
  }, {})

export { paramsBuild }
