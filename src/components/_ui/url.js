const paramsBuild = (params, values, query) =>
  Object.keys(params).reduce(
    ({ queryParams, eventParams }, id) => {
      const paramValue = params[id]
      const queryValue = valueClean(
        id,
        valueParse(id, valueGet(id, query[id], values), values),
        values
      )

      const paramString = valueStringify(id, paramValue, values)
      const queryString = valueStringify(id, queryValue, values)

      if (!queryString && paramString) {
        queryParams[id] = paramValue
      } else if (queryString && queryString !== query[id]) {
        // si le paramètre d'URL a été nettoyé, on le met à jour dans l'URL
        queryParams[id] = queryValue
      }

      if (queryString && queryString !== paramString) {
        eventParams[id] = queryValue
      }

      return { queryParams, eventParams }
    },
    { queryParams: {}, eventParams: {} }
  )

const valueStringify = (id, value, values) => {
  if (!(id in values)) return value

  if (!value) return null

  if (
    values[id].type === 'strings' ||
    values[id].type === 'tuple' ||
    values[id].type === 'numbers'
  ) {
    return value.length ? value.join(',') : null
  }

  if (values[id].type === 'number') {
    return value.toString()
  }

  if (values[id].type === 'objects') {
    if (!value.length) return null

    // entrée <=
    // [{ b: 2, a: 2 }, { a: 2, b: 1 }, { a: 1, b: 2 }]
    // sortie =>
    // [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 2, b: 2 }]

    const values = value
      .reduce((objects, object) => {
        object = Object.keys(object)
          .sort()
          .reduce((o, k) => {
            if (object[k] !== '') {
              o[k] = object[k]
            }

            return o
          }, {})

        if (Object.keys(object).length) {
          objects.push(JSON.stringify(object))
        }

        return objects
      }, [])
      .sort()

    if (!values.length) return null

    return `[${values.join(',')}]`
  }

  return value
}

const valueClean = (id, value, values) => {
  if (!value) return null

  if (!values[id] || !values[id].type) {
    return value
  }

  if (values[id].type === 'number') {
    if (values[id].max && value > values[id].max) {
      value = values[id].max
    } else if (values[id].min && value < values[id].min) {
      value = values[id].min
    }

    return value
  }

  if (
    (values[id].type === 'strings' || values[id].type === 'numbers') &&
    values[id].elements
  ) {
    value = value
      .reduce((acc, v) => {
        if (values[id].elements.includes(v)) {
          acc.push(v)
        }

        return acc
      }, [])
      .sort()

    return value
  }

  if (values[id].type === 'tuple') {
    return !Number(value[0]) || !Number(value[1]) ? null : value.map(Number)
  }

  if (values[id].type === 'string') {
    return values[id].elements && !values[id].elements.includes(value)
      ? null
      : value
  }

  if (values[id].type === 'objects') {
    // TODO: retirer les valeurs incorrectes

    return value.length ? value : null
  }

  return value
}

const valueParse = (id, value, values) => {
  if (!value) return null

  if (!values[id] || !values[id].type) {
    return value
  }

  if (values[id].type === 'number') {
    value = Number(value)

    return isNaN(value) ? null : value
  }

  if (values[id].type === 'strings') {
    if (typeof value !== 'string') return null

    return value.split(',').sort()
  }

  if (values[id].type === 'numbers') {
    if (typeof value !== 'string') return null

    return value
      .split(',')
      .map(v => Number(v))
      .sort()
  }

  if (values[id].type === 'string') {
    return value
  }

  if (values[id].type === 'tuple') {
    if (typeof value !== 'string') return null

    return value.split(',').slice(0, 2)
  }

  if (values[id].type === 'objects') {
    return JSON.parse(value)
  }

  return value
}

const valueGet = (id, value, values) => {
  if (!value) return null

  if (!(id in values)) return value

  return value || null
}

export { paramsBuild, valueGet, valueParse, valueStringify }
