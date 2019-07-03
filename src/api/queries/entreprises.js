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

export { queryEntreprise, queryEntreprises }
