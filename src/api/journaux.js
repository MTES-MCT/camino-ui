import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

const journaux = apiGraphQLFetch(gql`
  query Journaux(
    $intervalle: Int!
    $page: Int!
    $recherche: String
    $titreId: String
  ) {
    journaux(
      intervalle: $intervalle
      page: $page
      recherche: $recherche
      titreId: $titreId
    ) {
      elements {
        id
        date
        differences
        elementId
        operation
        utilisateur {
          nom
          prenom
        }
        titre {
          nom
        }
      }
      total
    }
  }
`)

export { journaux }
