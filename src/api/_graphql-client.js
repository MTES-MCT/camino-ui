import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { jsonTypenameOmit } from '../utils/index'

// for safari 11
import fetch from 'unfetch'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

console.log('api:', process.env.VUE_APP_API_URL)

const authLink = setContext((request, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: Object.assign({}, headers, {
      authorization: token ? `Bearer ${token}` : ''
    })
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_API_URL,
  fetch
})

// supprime les propriétés ___typename lors des mutations
const typenameOmitLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = jsonTypenameOmit(operation.variables)
  }

  return forward(operation)
})

const link = ApolloLink.from([authLink, typenameOmitLink, errorLink, httpLink])

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'EtapeType':
        return `${object.typeId}-${object.id}` // use `key` as the primary key
      default:
        return defaultDataIdFromObject(object) // fall back to default handling
    }
  }
})

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
