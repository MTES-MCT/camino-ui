import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { titres, titre } from './queries/titres'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const api = {
  async titresGet() {
    const res = await graphqlClient.query({
      query: titres,
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
  },

  async titreGet(id) {
    const res = await graphqlClient.query({
      query: titre,
      variables: { id }
    })

    return res.data.titre
  }
}

export default api
