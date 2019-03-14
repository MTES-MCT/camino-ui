import dateFormatLib from 'date-format'

const dateFormat = isoDate => {
  return dateFormatLib('yyyy-MM-dd', new Date(isoDate))
}

function numberFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

export { dateFormat, permissionsCheck, numberFormat }
