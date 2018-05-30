import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.VUE_APP_API_URL }),
  cache: new InMemoryCache()
})

console.log('api:', process.env.VUE_APP_API_URL)

const api = {
  async titresGet() {
    const res = await graphqlClient.query({
      query: gql`
        query Titres {
          titres(
            typeId: [apx, arc, arg, axm, prx, prh, pxc, pxg, pxm, cxx]
            domaineId: [m, h, s, g, c]
            statutId: [dmi, dmc, val, mdi, ech]
            police: [true, false]
          ) {
            id
            nom
            police
            type {
              id
              nom
            }
            domaine {
              id
              nom
            }
            statut {
              id
              nom
            }
            phases {
              geojsonPoints {
                type
                features {
                  type
                  geometry {
                    type
                    coordinates
                  }
                }
              }
              geojsonMultiPolygon {
                type
                geometry {
                  type
                  coordinates
                }
              }
            }
            substancesPrincipales {
              ...sub
            }
            substancesSecondaires {
              ...sub
            }
          }
        }

        fragment sub on Substance {
          id
          nom
          domaine
          type
          usage
          symbole
          alias
          gerep
          description
          legal {
            id
            nom
            description
            lien
          }
        }

      `
    })

    return res.data.titres
  },

  async titreGet(id) {
    const res = await graphqlClient.query({
      query: gql`
        query Titre($id: String!) {
          titre(id: $id) {
            nom
            id
            type {
              id
              nom
            }
            domaine {
              id
              nom
            }
            statut {
              id
              nom
            }
            police
            phases {
              id
              date
              duree
              geojsonPoints {
                type
                features {
                  type
                  geometry {
                    type
                    coordinates
                  }
                }
              }
              geojsonMultiPolygon {
                type
                geometry {
                  type
                  coordinates
                }
              }
            }
            substancesPrincipales {
              id
              nom
            }
          }
        }
      `,
      variables: { id }
    })

    return res.data.titre
  }
}

export default api
