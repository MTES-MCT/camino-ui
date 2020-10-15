import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentAdministration } from './fragments/administration'
import { fragmentAdministrations } from './fragments/administrations'

const administration = apiGraphQLFetch(gql`
  query Administration($id: ID!) {
    administration(id: $id) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const metasAdministrations = apiGraphQLFetch(
  gql`
    query MetasAdministrations {
      administrationsTypes {
        id
        nom
        ordre
      }
    }
  `
)

const administrations = apiGraphQLFetch(gql`
  query Administrations(
    $intervalle: Int
    $page: Int
    $colonne: String
    $ordre: String
    $noms: String
    $typesIds: [ID]
  ) {
    administrations(
      intervalle: $intervalle
      page: $page
      colonne: $colonne
      ordre: $ordre
      noms: $noms
      typesIds: $typesIds
    ) {
      elements {
        ...administrations
      }
      total
    }
  }

  ${fragmentAdministrations}
`)

export { administration, administrations, metasAdministrations }
