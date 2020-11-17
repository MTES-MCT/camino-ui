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

const jsonTypenameOmit = json => JSON.parse(JSON.stringify(json), typenameOmit)

const elementsFormat = (id, metas) => metas[id.replace(/Ids/g, '')]

export {
  dateFormat,
  permissionsCheck,
  textNumberFormat,
  textToNumberFormat,
  jsonTypenameOmit,
  elementsFormat
}
