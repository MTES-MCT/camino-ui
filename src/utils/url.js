const valueClean = (value, definition) => {
  if (definition.type === 'number') {
    if (definition.max && value > definition.max) {
      value = definition.max
    } else if (definition.min && value < definition.min) {
      value = definition.min
    }

    return value
  }

  if (
    (definition.type === 'strings' || definition.type === 'numbers') &&
    definition.elements
  ) {
    value = value
      .reduce((acc, v) => {
        if (definition.elements.includes(v)) {
          acc.push(v)
        }

        return acc
      }, [])
      .sort()

    return value
  }

  if (definition.type === 'tuple') {
    return !Number(value[0]) || !Number(value[1]) ? null : value.map(Number)
  }

  if (definition.type === 'string') {
    return definition.elements && !definition.elements.includes(value)
      ? null
      : value
  }

  if (definition.type === 'objects') {
    // TODO: retirer les valeurs incorrectes

    return value.length ? value : null
  }

  return value
}

const valueParse = (id, value, definitions) => {
  if (!value) return null

  const definition = definitions.find(p => p.id === id)

  if (!definition || !definition.type) {
    return value
  }

  if (definition.type === 'number') {
    value = Number(value)

    return isNaN(value) ? null : value
  }

  if (definition.type === 'strings') {
    if (typeof value !== 'string') return null

    return value.split(',').sort()
  }

  if (definition.type === 'numbers') {
    if (typeof value !== 'string') return null

    return value
      .split(',')
      .map(v => Number(v))
      .sort()
  }

  if (definition.type === 'string') {
    return value
  }

  if (definition.type === 'tuple') {
    if (typeof value !== 'string') return null

    return value.split(',').slice(0, 2)
  }

  if (definition.type === 'objects') {
    return JSON.parse(value)
  }

  return valueClean(value, definition)
}

const valueStringify = (id, value, definitions) => {
  if (!value) return null

  const definition = definitions.find(p => p.id === id)

  if (
    definition.type === 'strings' ||
    definition.type === 'tuple' ||
    definition.type === 'numbers'
  ) {
    return value.length ? value.join(',') : null
  }

  if (definition.type === 'number') {
    return value.toString()
  }

  if (definition.type === 'objects') {
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

const urlQueryParamsGet = (params, sourceQuery, definitions) =>
  Object.keys(params).reduce((queryParams, id) => {
    const queryString = sourceQuery[id] || null

    if (queryString) {
      const queryValue = valueParse(id, queryString, definitions)
      const preferenceString = valueStringify(id, params[id], definitions)

      if (queryString !== preferenceString) {
        queryParams[id] = queryValue
      }
    }

    return queryParams
  }, {})

const urlQueryUpdate = (params, sourceQuery, definitions) =>
  Object.keys(params).reduce(
    ({ query, status }, id) => {
      const queryString = sourceQuery[id] || null
      const preferenceString = valueStringify(id, params[id], definitions)

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
