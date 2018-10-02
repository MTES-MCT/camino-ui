const dateFormat = date => {
  const d = new Date(Number(date))
  var dd = d.getDate()
  var mm = d.getMonth() + 1
  var yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

export { dateFormat }
