import gql from 'graphql-tag'
import {
  fragmentEntreprise,
  fragmentEntrepriseList
} from './fragments/entreprise'

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
      ...entrepriseList
    }
  }

  ${fragmentEntrepriseList}
`

export { queryEntreprise, queryEntreprises }
