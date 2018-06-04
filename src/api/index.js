import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { titres as titresQuery, titre as titreQuery } from './queries/titres'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const titres = async () => {
  const res = await graphqlClient.query({
    query: titresQuery,
    variables: {
      typeIds: [
        'apx',
        'arc',
        'arg',
        'axm',
        'prx',
        'prh',
        'pxc',
        'pxg',
        'pxm',
        'cxx'
      ],
      domaineIds: ['m', 'h', 's', 'g', 'c'],
      statutIds: ['dmi', 'dmc', 'val', 'mdi', 'ech'],
      policeIds: [true, false]
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
