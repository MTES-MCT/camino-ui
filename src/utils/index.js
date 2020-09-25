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

const textToNumberFormat = val => {
  const reversedVal = val.replaceAll(/\s/g, '').replace(/,/g, '.')
  return Number.isNaN(reversedVal) ? '' : reversedVal
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

const typenameOmit = (key, value) => (key === '__typename' ? undefined : value)

const jsonTypenameOmit = json => JSON.parse(JSON.stringify(json), typenameOmit)

export {
  dateFormat,
  permissionsCheck,
  numberFormat,
  textToNumberFormat,
  jsonTypenameOmit
}
