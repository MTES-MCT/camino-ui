const dateFormat = dateString => {
  const [y, m, d] = dateString.split('-')
  return `${d}/${m}/${y}`
  // .replace(/ *\([^)]*\) */g,'')
}

const numberFormat = x => {
  return Intl.NumberFormat('FR-fr', {
    maximumSignificantDigits: 21
  }).format(x)
}

const reversenumberFormat = (val, locale) => {
  const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '')
  const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '')
  const reversedVal = val
    .replace(new RegExp('\\' + group, 'g'), '')
    .replace(new RegExp('\\' + decimal, 'g'), '.')
    .replace(' ', '')
  return Number.isNaN(reversedVal) ? 0 : reversedVal
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

const typenameOmit = (key, value) => (key === '__typename' ? undefined : value)

const jsonTypenameOmit = json => JSON.parse(JSON.stringify(json), typenameOmit)

export {
  dateFormat,
  permissionsCheck,
  numberFormat,
  reversenumberFormat,
  jsonTypenameOmit
}
