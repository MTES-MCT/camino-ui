import gql from 'graphql-tag'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentEntreprise } from './fragments/entreprise'

import { apiQuery, apiMutate } from './_utils'

const entreprise = apiQuery(gql`
  query Entreprise($id: ID!) {
    entreprise(id: $id) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`)

const entreprises = apiQuery(gql`
  query Entreprises {
    entreprises {
      ...entreprises
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
