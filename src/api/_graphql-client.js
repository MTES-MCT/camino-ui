import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

// for safari 11
import 'unfetch/polyfill'

console.info('api:', process.env.VUE_APP_API_URL)

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.info(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.info(`[Network error]: ${networkError}`)
  }
})

const linkAuth = setContext((request, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: Object.assign({}, headers, {
      authorization: token ? `Bearer ${token}` : ''
    })
  }
})

const linkUpload = createUploadLink({ uri: process.env.VUE_APP_API_URL })

const link = ApolloLink.from([linkAuth, linkError, linkUpload])

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      // selon le type du titre et de la démarche,
      // le type d'étape a des propriétés spécifiques
      case 'EtapeType':
        return `${object.titreTypeId}-${object.demarcheTypeId}-${object.id}`
      case 'DemarcheType':
        return `${object.titreTypeId}-${object.id}`
      case 'TitreType':
        return `${object.typeId}-${object.domaineId}-${object.id}`
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
