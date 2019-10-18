const dateFormat = dateString => {
  const [y, m, d] = dateString.split('-')
  return `${d} / ${m} / ${y}`
  // .replace(/ *\([^)]*\) */g,'')
}

const numberFormat = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

const permissionsTitreAdministrationsCheck = (
  userAdministrations = [],
  titreAdministrations = []
) => {
  if (!userAdministrations.length || !titreAdministrations.length) return false

  const administrations = [
    ...userAdministrations.map(a => a.id),
    ...titreAdministrations.map(a => a.id)
  ]

  return new Set(administrations).length !== administrations.length
}

const typenameOmit = (key, value) => (key === '__typename' ? undefined : value)

const jsonTypenameOmit = json => JSON.parse(JSON.stringify(json), typenameOmit)

export {
  dateFormat,
  permissionsCheck,
  permissionsTitreAdministrationsCheck,
  numberFormat,
  jsonTypenameOmit
}
