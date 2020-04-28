import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'

import {
  fragmentActivites,
  fragmentActivite,
  fragmentActiviteType
} from './fragments/titre-activite'

const metasActivites = apiQuery(
  gql`
    query MetasActivites {
      activitesTypes {
        ...activiteType
      }
      activitesAnnees
    }

    ${fragmentActiviteType}
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const activiteModifier = apiMutate(gql`
  mutation ActiviteModifier($activite: InputActiviteModification!) {
    activiteModifier(activite: $activite) {
      ...activite
    }
  }

  ${fragmentActivite}
`)

const activites = apiQuery(
  gql`
    query Activites(
      $intervalle: Int
      $page: Int
      $colonne: String
      $ordre: String
      $typesIds: [ID]
      $annees: [Int]
    ) {
      activites(
        intervalle: $intervalle
        page: $page
        colonne: $colonne
        ordre: $ordre
        typesIds: $typesIds
        annees: $annees
      ) {
        activites {
          ...activites
        }
        total
      }
    }

    ${fragmentActivites}
  `,
  { fetchPolicy: 'network-only' }
)

const activite = apiQuery(
  gql`
    query Activite($id: ID!) {
      activite(id: $id) {
        ...activite
      }
    }

    ${fragmentActivite}
  `,
  { fetchPolicy: 'network-only' }
)

export { activite, activites, activiteModifier, metasActivites }
