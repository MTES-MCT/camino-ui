import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

const apiFetch = (type, request, options = {}) => async variables => {
  try {
    const res = await graphqlClient[type]({
      ...request,
      variables,
      ...options
    })

    if (!res && !res.data) throw new Error('erreur API: réponse vide')

    const keys = Object.keys(res.data)

    return keys.length === 1 ? res.data[keys[0]] : res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const apiQuery = (query, options) => apiFetch('query', { query }, options)

const apiMutate = (mutation, options) =>
  apiFetch('mutate', { mutation }, options)

export { apiQuery, apiMutate }
