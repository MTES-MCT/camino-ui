const removeTypename = value => {
  if (value === null || value === undefined) {
    return value
  } else if (Array.isArray(value)) {
    return value.map(v => removeTypename(v))
  } else if (typeof value === 'object') {
    const newObj = {}
    Object.keys(value).forEach(key => {
      if (key !== '__typename') {
        newObj[key] = removeTypename(value[key])
      }
    })
    return newObj
  }
  return value
}

export { removeTypename }
