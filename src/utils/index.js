const dateFormat = dateString => {
  const [y, m, d] = dateString.split('-')
  return `${d}/${m}/${y}`
  // .replace(/ *\([^)]*\) */g,'')
}

const textNumberFormat = (text, options) => {
  let value = text
    .replace(/[^\d-,.]+/, '')
    .replace(/\s/, '')
    .replace(/\./, ',')

  value = options.negative
    ? value.replace(/^([\d-][\d,]*)(-)+/, '$1')
    : value.replace(/-/g, '')

  value = options.integer
    ? value.replace(/\..*$/, '').replace(/,.*$/, '')
    : value.replace(/(\d+,\d*)([,.]+)/, '$1')

  return value
}

const textToNumberFormat = text => {
  const value = text.replace(/\s/g, '').replace(/,/g, '.')

  const number = parseFloat(value)

  return Number.isNaN(number) ? undefined : number
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

const typenameOmit = (key, value) => (key === '__typename' ? undefined : value)

const cloneAndClean = json => JSON.parse(JSON.stringify(json), typenameOmit)

const elementsFormat = (id, metas) => metas[id.replace(/Ids/g, '')]

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

export {
  dateFormat,
  permissionsCheck,
  textNumberFormat,
  textToNumberFormat,
  cloneAndClean,
  elementsFormat,
  paramsBuild
}
