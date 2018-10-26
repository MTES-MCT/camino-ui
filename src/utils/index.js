const dateFormat = timestamp => {
  const d = new Date(Number(timestamp))
  var dd = d.getDate()
  var mm = d.getMonth() + 1
  var yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

const timestampFormat = date =>
  new Date(
    date
      .split('-')
      .reverse()
      .join('-')
  ).getTime()

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

export { dateFormat, timestampFormat, permissionsCheck }
