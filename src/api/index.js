import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import queryTitres from './queries/titres'
import queryTitre from './queries/titre'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const titres = async ({
  filtrer,
  typeIds,
  domaineIds,
  statutIds,
  substances
}) => {
  const res = await graphqlClient.query({
    query: queryTitres,
    variables: {
      filtrer,
      typeIds,
      domaineIds,
      statutIds,
      substances
    }
  })

  return res.data
}

const titre = async id => {
  const res = await graphqlClient.query({
    query: queryTitre,
    variables: { id }
  })

  return res.data.titre
}

export { titres, titre }
