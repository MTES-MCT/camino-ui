import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { GraphQL } from 'graphql-react'

// for safari 11
import 'unfetch/polyfill'

import { fragmentUtilisateurToken } from './fragments/utilisateur'

const graphql = new GraphQL()

const errorThrow = e => {
  const errorMessage = `API : ${e.message || e.status}`
  console.error(e)

  throw errorMessage
}

const restCall = async url => {
  const token = localStorage.getItem('accessToken')
  const headers = new Headers({
    authorization: token ? `Bearer ${token}` : ''
  })
  const res = await fetch(url, { method: 'GET', headers })
  if (res.status !== 200) {
    throw res
  }
  return res
}

const graphQLCall = async (query, variables) => {
  const token = localStorage.getItem('accessToken')
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

  const keys = Object.keys(data)
  const dataContent = keys.length === 1 ? data[keys[0]] : data

  return dataContent
}

const apiGraphQLFetch = query => async variables =>
  apiFetch(graphQLCall, query, variables)

const apiRestFetch = url => apiFetch(restCall, url)

const apiFetch = async (call, query, variables) => {
  try {
    return await call(query, variables)
  } catch (e) {
    if (e.status === 401) {
      await tokenRefresh()
      return await call(query, variables)
    } else {
      errorThrow(e)
    }
  }
}

const utilisateurTokenRafraichir = gql`
  mutation UtilisateurTokenRafraichir($refreshToken: String!) {
    utilisateurTokenRafraichir(refreshToken: $refreshToken) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`

const tokenRefresh = async () => {
  try {
    localStorage.removeItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    // On ne peut pas utiliser apiGraphQLFetch, car ça pourrait générer une boucle infinie
    const data = await graphQLCall(utilisateurTokenRafraichir, { refreshToken })
    localStorage.setItem('accessToken', data.accessToken)
  } catch (e) {
    // Si on est incapable de rafraichir le token c’est que la session a été invalidée par un administrateur
    // ne sachant pas si il voit des informations confidentielles actuellement,
    // il est préférable de rafraichir totalement la page
    window.location.reload()
  }
}

export { apiGraphQLFetch, apiRestFetch }
