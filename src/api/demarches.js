import gql from 'graphql-tag'
import { fragmentDemarches } from './fragments/demarches'

import { apiQuery } from './_utils'

const demarches = apiQuery(
  gql`
    query Demarches(
      $page: Int
      $intervalle: Int
      $colonne: String
      $ordre: String
      $titresDomainesIds: [ID!]
      $titresTypesIds: [ID!]
      $titresStatutsIds: [ID!]
      $typesIds: [ID!]
      $statutsIds: [ID!]
      $etapesInclues: [InputEtapeFiltre!]
      $etapesExclues: [InputEtapeFiltre!]
    ) {
      demarches(
        page: $page
        intervalle: $intervalle
        colonne: $colonne
        ordre: $ordre
        titresDomainesIds: $titresDomainesIds
        titresTypesIds: $titresTypesIds
        titresStatutsIds: $titresStatutsIds
        typesIds: $typesIds
        statutsIds: $statutsIds
        etapesInclues: $etapesInclues
        etapesExclues: $etapesExclues
      ) {
        ...demarches
      }
    }

    ${fragmentDemarches}
  `,
  { fetchPolicy: 'network-only' }
)

export { demarches }
