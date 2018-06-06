import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { titres as titresQuery, titre as titreQuery } from './queries/titres'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const titres = async ({
  typeIds,
  domaineIds,
  statutIds,
  polices,
  substances
}) => {
  const res = await graphqlClient.query({
    query: titresQuery,
    variables: {
      typeIds,
      domaineIds,
      statutIds,
      polices,
      substances
    }
  })

  return res.data.titres
}

const titre = async id => {
  const res = await graphqlClient.query({
    query: titreQuery,
    variables: { id }
  })

  return res.data.titre
}

export { titres, titre }
