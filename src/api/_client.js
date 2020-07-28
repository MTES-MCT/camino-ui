import { print } from 'graphql/language/printer'
import { GraphQL } from 'graphql-react'

// for safari 11
import 'unfetch/polyfill'
import gql from 'graphql-tag'
import { fragmentUtilisateurToken } from '@/api/fragments/utilisateur'

const graphql = new GraphQL()

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

const queryToGraphQLCall = query => async variables => {
  return await graphQLCall(query, variables)
}

const utilisateurTokenRafraichir = queryToGraphQLCall(gql`
  mutation UtilisateurTokenRafraichir($refreshToken: String!) {
    utilisateurTokenRafraichir(refreshToken: $refreshToken) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const apiFetch = query => async variables => {
  try {
    return await graphQLCall(query, variables)
  } catch (e) {
    if (e.status === 401) {
      try {
        localStorage.removeItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const data = await utilisateurTokenRafraichir({ refreshToken })
        localStorage.setItem('accessToken', data.accessToken)
        return await graphQLCall(query, variables)
      } catch (e) {
        const errorMessage = `API : ${e.message || e.status}`
        console.error(e)
        throw errorMessage
      }
    } else {
      const errorMessage = `API : ${e.message || e.status}`
      console.error(e)
      throw errorMessage
    }
  }
}

export { apiFetch }
