import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

// for safari 11
import fetch from 'unfetch'

console.log('api:', process.env.VUE_APP_API_URL)

const authLink = setContext((request, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_API_URL,
  fetch
})

const omitTypename = (key, value) => {
  return key === '__typename' ? undefined : value
}

// supprime les propriétés ___typename lors des mutations
const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward(operation)
})

// supprime les propriétés ___typename lors des requêtes
// const removeTypenameLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map(response => {
//     console.log(response.data)
//     response.data = JSON.parse(JSON.stringify(response.data), omitTypename)

//     return response
//   })
// })

const link = ApolloLink.from([authLink, omitTypenameLink, httpLink])
const cache = new InMemoryCache()

const graphqlClient = new ApolloClient({
  link,
  cache
})

export default graphqlClient
