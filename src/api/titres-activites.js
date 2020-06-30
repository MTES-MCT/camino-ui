import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'

import {
  fragmentActivites,
  fragmentActivite,
  fragmentActiviteType,
  fragmentActiviteStatut
} from './fragments/titre-activite'

import { fragmentTitreTypeType } from './fragments/metas'

const metasActivites = apiQuery(
  gql`
    query MetasActivites {
      activitesTypes {
        ...activiteType
      }
      activitesStatuts {
        ...activiteStatut
      }
      activitesAnnees

      domaines {
        id
        nom
        titresCreation
      }

      types {
        ...titreTypeType
      }

      statuts {
        id
        nom
        couleur
      }
    }

    ${fragmentActiviteType}

    ${fragmentActiviteStatut}

    ${fragmentTitreTypeType}
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
      $statutsIds: [ID]
      $annees: [Int]
      $titresNoms: String
      $titresEntreprises: String
      $titresSubstances: String
      $titresReferences: String
      $titresTerritoires: String
    ) {
      activites(
        intervalle: $intervalle
        page: $page
        colonne: $colonne
        ordre: $ordre
        typesIds: $typesIds
        statutsIds: $statutsIds
        annees: $annees
        titresNoms: $titresNoms
        titresEntreprises: $titresEntreprises
        titresSubstances: $titresSubstances
        titresReferences: $titresReferences
        titresTerritoires: $titresTerritoires
      ) {
        elements {
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
