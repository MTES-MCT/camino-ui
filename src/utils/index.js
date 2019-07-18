import dateFormatLib from 'date-format'

const dateFormat = isoDate => {
  return dateFormatLib('yyyy-MM-dd', new Date(isoDate))
  // .replace(/ *\([^)]*\) */g,'')
}

const numberFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const permissionsCheck = (userPermission, permissions) =>
  permissions.includes(userPermission.id)

const typenameOmit = (key, value) =>
        key === '__typename' ? undefined : value

const jsonTypenameOmit = json =>
        JSON.parse(JSON.stringify(json), typenameOmit)

export { dateFormat, permissionsCheck, numberFormat, jsonTypenameOmit }
