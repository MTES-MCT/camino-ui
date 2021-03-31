const paramsBuild = (sourceParams, sourceQuery, values) =>
  Object.keys(values).reduce(
    ({ queryParams, params }, id) => {
      const paramValue = sourceParams[id] || null
      const queryValue = valueParse(id, sourceQuery[id], values)

      const paramString = paramValue && valueStringify(id, paramValue, values)
      const queryString = queryValue && valueStringify(id, queryValue, values)

      if (
        queryString &&
        (queryString !== paramString || queryString !== sourceQuery[id])
      ) {
        queryParams[id] = queryValue
      } else if (paramString && queryString !== paramString) {
        queryParams[id] = paramValue
      }

      if (queryString && queryString !== paramString) {
        params[id] = queryValue
      }

      return { queryParams, params }
    },
    { queryParams: {}, params: {} }
  )

const queryUpdate = (sourceParams, sourceQuery, values) =>
  Object.keys(values).reduce(
    ({ query, status }, id) => {
      const queryString = sourceQuery[id] || null
      const paramString = valueStringify(id, sourceParams[id], values)

      if (queryString !== paramString) {
        status = queryString || status === 'updated' ? 'updated' : 'created'
      }

      if (paramString) {
        query[id] = paramString
      } else {
        delete query[id]
      }

      return { query, status }
    },
    { query: JSON.parse(JSON.stringify(sourceQuery)), status: 'unchanged' }
  )

const queryClean = (sourceQuery, values) =>
  Object.keys(sourceQuery).reduce(
    ({ query, updated }, id) => {
      if (values[id]) {
        updated = true
      } else {
        query[id] = sourceQuery[id]
      }

      return { query, updated }
    },
    { query: {}, updated: false }
  )

const paramsCompare = (newParams, oldParams, values) => {
  let hasChanged = false

  Object.keys(newParams).forEach(id => {
    const newParamString = valueStringify(id, newParams[id], values)
    const oldParamString = valueStringify(id, oldParams[id], values)

    if (newParamString !== oldParamString) {
      hasChanged = true
    }
  })

  Object.keys(oldParams).forEach(id => {
    const newParamString = valueStringify(id, newParams[id], values)
    const oldParamString = valueStringify(id, oldParams[id], values)

    if (newParamString !== oldParamString) {
      hasChanged = true
    }
  })

  return hasChanged
}

const valueStringify = (id, value, values) => {
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

  return valueClean(id, value, values)
}

export { paramsBuild, queryUpdate, queryClean, paramsCompare }
