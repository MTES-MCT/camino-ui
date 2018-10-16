const dateFormat = date => {
  const d = new Date(Number(date))
  var dd = d.getDate()
  var mm = d.getMonth() + 1
  var yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

const permissions = (userPermissions, permissions) => {
  return userPermissions.map(p => p.id).some(e => permissions.includes(e))
}

export { dateFormat, permissions }
