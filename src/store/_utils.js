// récupère les paramètres depuis les préférences utilisateurs
const paramsBuild = (apiParams, preferences) =>
  apiParams.reduce((params, { id, type }) => {
    let value

    if (type === 'array') {
      const values = preferences[id] && preferences[id].split(',')
      value = values && values.length ? values : null
    } else if (type === 'string') {
      value = preferences[id] && preferences[id].toString()
    } else {
      // type === 'number'
      value = preferences[id]
    }

    if (value) {
      params = Object.assign(params, { [id]: value })
    }

    return params
  }, {})

export { paramsBuild }
