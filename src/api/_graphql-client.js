import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { onError } from 'apollo-link-error'

// for safari 11
import fetch from 'unfetch'

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     )
//   }

//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`)
//   }
// })

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
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'cache-and-network',
  //     errorPolicy: 'all'
  //   },
  //   query: {
  //     fetchPolicy: 'network-only',
  //     errorPolicy: 'all'
  //   },
  //   mutate: {
  //     errorPolicy: 'all'
  //   }
  // }
})

export default graphqlClient
