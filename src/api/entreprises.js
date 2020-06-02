import gql from 'graphql-tag'
import { apiQuery, apiMutate } from './_utils'

import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentEntreprise } from './fragments/entreprise'

const entreprise = apiQuery(gql`
  query Entreprise($id: ID!) {
    entreprise(id: $id) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

const entreprises = apiQuery(gql`
  query Entreprises(
    $intervalle: Int
    $page: Int
    $colonne: String
    $ordre: String
    $noms: String
    $etapeId: String
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

const entrepriseCreer = apiMutate(gql`
  mutation EntrepriseCreer($entreprise: InputEntrepriseCreation!) {
    entrepriseCreer(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

const entrepriseModifier = apiMutate(gql`
  mutation EntrepriseModifier($entreprise: InputEntrepriseModification!) {
    entrepriseModifier(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

export { entreprise, entreprises, entrepriseCreer, entrepriseModifier }
