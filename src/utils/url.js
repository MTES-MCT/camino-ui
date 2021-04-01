const valueClean = (id, value, param) => {
  if (param.type === 'number') {
    if (param.max && value > param.max) {
      value = param.max
    } else if (param.min && value < param.min) {
      value = param.min
    }

    return value
  }

  if (
    (param.type === 'strings' || param.type === 'numbers') &&
    param.elements
  ) {
    value = value
      .reduce((acc, v) => {
        if (param.elements.includes(v)) {
          acc.push(v)
        }

        return acc
      }, [])
      .sort()

    return value
  }

  if (param.type === 'tuple') {
    return !Number(value[0]) || !Number(value[1]) ? null : value.map(Number)
  }

  if (param.type === 'string') {
    return param.elements && !param.elements.includes(value) ? null : value
  }

  if (param.type === 'objects') {
    // TODO: retirer les valeurs incorrectes

    return value.length ? value : null
  }

  return value
}

const valueParse = (id, value, params) => {
  if (!value) return null

  const param = params.find(p => p.id === id)

  if (!param || !param.type) {
    return value
  }

  if (param.type === 'number') {
    value = Number(value)

    return isNaN(value) ? null : value
  }

  if (param.type === 'strings') {
    if (typeof value !== 'string') return null

    return value.split(',').sort()
  }

  if (param.type === 'numbers') {
    if (typeof value !== 'string') return null

    return value
      .split(',')
      .map(v => Number(v))
      .sort()
  }

  if (param.type === 'string') {
    return value
  }

  if (param.type === 'tuple') {
    if (typeof value !== 'string') return null

    return value.split(',').slice(0, 2)
  }

  if (param.type === 'objects') {
    return JSON.parse(value)
  }

  return valueClean(id, value, param)
}

const valueStringify = (id, value, params) => {
  if (!value) return null

  const param = params.find(p => p.id === id)

  if (
    param.type === 'strings' ||
    param.type === 'tuple' ||
    param.type === 'numbers'
  ) {
    return value.length ? value.join(',') : null
  }

  if (param.type === 'number') {
    return value.toString()
  }

  if (param.type === 'objects') {
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

const urlQueryParamsGet = (preferences, sourceQuery, params) =>
  Object.keys(preferences).reduce((queryParams, id) => {
    const queryString = sourceQuery[id] || null

    if (queryString) {
      const queryValue = valueParse(id, queryString, params)
      const preferenceString = valueStringify(id, preferences[id], params)

      if (queryString !== preferenceString) {
        queryParams[id] = queryValue
      }
    }

    return queryParams
  }, {})

const urlQueryUpdate = (preferences, sourceQuery, params) =>
  Object.keys(preferences).reduce(
    ({ query, status }, id) => {
      const queryString = sourceQuery[id] || null
      const preferenceString = valueStringify(id, preferences[id], params)

      if (queryString !== preferenceString) {
        status = queryString || status === 'updated' ? 'updated' : 'created'
      }

      if (preferenceString) {
        query[id] = preferenceString
      }

      return { query, status }
    },
    {
      query: {},
      status: null
    }
  )

export { urlQueryParamsGet, urlQueryUpdate }
