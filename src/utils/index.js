const dateFormat = isoDate => {
  const d = new Date(isoDate)
  var dd = d.getDate()
  var mm = d.getMonth() + 1
  var yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

const isoDateFormat = date =>
  new Date(
    date
      .split('-')
      .reverse()
      .join('-')
  )

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

export { dateFormat, isoDateFormat, permissionsCheck }
