import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentAdministration } from './fragments/administration'
import { fragmentAdministrations } from './fragments/administrations'

const metasAdministration = apiGraphQLFetch(
  gql`
    query MetasAdministration {
      administrationsTypes {
        id
        nom
        ordre
      }

      regions {
        id
        nom
      }

      departements {
        id
        nom
      }
    }
  `
)

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

const administrationModifier = apiGraphQLFetch(gql`
  mutation AdministrationModifier($administration: InputAdministration!) {
    administrationModifier(administration: $administration) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

export {
  metasAdministration,
  administration,
  metasAdministrations,
  administrations,
  administrationModifier
}
