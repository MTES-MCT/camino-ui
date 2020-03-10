// récupère les paramètres depuis les préférences utilisateurs
const paramsArrayBuild = (paramsCheckboxes, preferences) =>
  paramsCheckboxes.reduce((params, id) => {
    const values = preferences[id] && preferences[id].split(',')

    if (values && values.length) {
      params = Object.assign(params, { [id]: values })
    }

    return params
  }, {})

const paramsStringBuild = (paramsInputs, preferences) =>
  paramsInputs.reduce((params, id) => {
    const value = preferences[id]

    if (value) {
      params = Object.assign(params, { [id]: value })
    }

    return params
  }, {})

export { paramsArrayBuild, paramsStringBuild }
