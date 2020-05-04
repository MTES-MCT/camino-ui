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
    $nomSiren: String
  ) {
    entreprises(
      intervalle: $intervalle
      page: $page
      colonne: $colonne
      ordre: $ordre
      nomSiren: $nomSiren
    ) {
      entreprises {
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
