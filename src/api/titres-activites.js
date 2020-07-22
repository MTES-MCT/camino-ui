import gql from 'graphql-tag'
import { apiFetch } from './_client'

import {
  fragmentActivites,
  fragmentActivite,
  fragmentActiviteType,
  fragmentActiviteStatut
} from './fragments/titre-activite'

import { fragmentTitreTypeType } from './fragments/metas'

const metasActivites = apiFetch(
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
  `
)

const activiteModifier = apiFetch(gql`
  mutation ActiviteModifier($activite: InputActiviteModification!) {
    activiteModifier(activite: $activite) {
      ...activite
    }
  }

  ${fragmentActivite}
`)

const activites = apiFetch(
  gql`
    query Activites(
      $intervalle: Int
      $page: Int
      $colonne: String
      $ordre: String
      $typesIds: [ID]
      $statutsIds: [ID]
      $annees: [Int]
      $titresTypesIds: [ID]
      $titresDomainesIds: [ID]
      $titresStatutsIds: [ID]
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
        titresTypesIds: $titresTypesIds
        titresDomainesIds: $titresDomainesIds
        titresStatutsIds: $titresStatutsIds
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
  `
)

const activite = apiFetch(
  gql`
    query Activite($id: ID!) {
      activite(id: $id) {
        ...activite
      }
    }

    ${fragmentActivite}
  `
)

export { activite, activites, activiteModifier, metasActivites }
