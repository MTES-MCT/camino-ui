import gql from 'graphql-tag'
import fragmentEntreprise from './fragments/entreprise'
import fragmentEntreprises from './fragments/entreprises'

const queryEntreprise = gql`
  query Entreprise($id: ID!) {
    entreprise(id: $id) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

const queryEntreprises = gql`
  query Entreprises {
    entreprises {
      ...entreprises
    }
  }

  ${fragmentEntreprises}
`

const mutationEntrepriseCreer = gql`
  mutation EntrepriseCreer($entreprise: InputEntrepriseCreation!) {
    entrepriseCreer(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

const mutationEntrepriseModifier = gql`
  mutation EntrepriseModifier($entreprise: InputEntrepriseModification!) {
    entrepriseModifier(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

export {
  queryEntreprise,
  queryEntreprises,
  mutationEntrepriseCreer,
  mutationEntrepriseModifier
}
