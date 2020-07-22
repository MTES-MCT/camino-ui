import { print } from 'graphql/language/printer'
import { GraphQL } from 'graphql-react'

// for safari 11
import 'unfetch/polyfill'

const graphql = new GraphQL()

const apiFetch = query => async variables => {
  try {
    const token = localStorage.getItem('token')
    const queryString = print(query)

    const res = await graphql.operate({
      operation: { query: queryString, variables },
      fetchOptionsOverride: options => {
        options.url = '/api'
        options.headers = Object.assign(options.headers, {
          authorization: token ? `Bearer ${token}` : ''
        })
      }
    })

    const value = await res.cacheValuePromise

    if (value.graphQLErrors) throw value.graphQLErrors[0]
    if (value.fetchError) throw value.fetchError
    if (value.httpError) throw value.httpError
    if (value.parseError) throw value.parseError

    const data = value.data
    if (!data) throw new Error('réponse vide')

    const keys = Object.keys(data)
    const dataContent = keys.length === 1 ? data[keys[0]] : data
    if (!dataContent) throw new Error('réponse vide')

    return dataContent
  } catch (e) {
    const errorMessage = `Erreur API : ${e.message}`
    console.error(e)
    throw errorMessage
  }
}

export { apiFetch }
