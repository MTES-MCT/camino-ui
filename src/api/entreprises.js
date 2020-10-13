import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentEntreprise } from './fragments/entreprise'

const entreprise = apiGraphQLFetch(
  gql`
    query Entreprise($id: ID!) {
      entreprise(id: $id) {
        ...entreprise
      }
    }

    ${fragmentEntreprise}
  `
)

const entreprises = apiGraphQLFetch(gql`
  query Entreprises(
    $intervalle: Int
    $page: Int
    $colonne: String
    $ordre: String
    $noms: String
    $etapeId: ID
  ) {
    entreprises(
      intervalle: $intervalle
      page: $page
      colonne: $colonne
      ordre: $ordre
      noms: $noms
      etapeId: $etapeId
    ) {
      elements {
        ...entreprises
      }
      total
    }
  }

  ${fragmentEntreprises}
`)

const entrepriseCreer = apiGraphQLFetch(gql`
  mutation EntrepriseCreer($entreprise: InputEntrepriseCreation!) {
    entrepriseCreer(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

const entrepriseModifier = apiGraphQLFetch(gql`
  mutation EntrepriseModifier($entreprise: InputEntrepriseModification!) {
    entrepriseModifier(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

export { entreprise, entreprises, entrepriseCreer, entrepriseModifier }
