import gql from 'graphql-tag'
import { apiFetch } from './_client'

import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentEntreprise } from './fragments/entreprise'

const entreprise = apiFetch(
  gql`
    query Entreprise($id: ID!) {
      entreprise(id: $id) {
        ...entreprise
      }
    }

    ${fragmentEntreprise}
  `
)

const entreprises = apiFetch(gql`
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

const entrepriseCreer = apiFetch(gql`
  mutation EntrepriseCreer($entreprise: InputEntrepriseCreation!) {
    entrepriseCreer(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

const entrepriseModifier = apiFetch(gql`
  mutation EntrepriseModifier($entreprise: InputEntrepriseModification!) {
    entrepriseModifier(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

export { entreprise, entreprises, entrepriseCreer, entrepriseModifier }
