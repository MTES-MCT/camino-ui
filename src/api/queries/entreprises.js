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

const queryEntrepriseParSirenDatabase = gql`
  query EntrepriseParSirenDatabase($siren: String!) {
    entrepriseParSirenDatabase(siren: $siren) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

const queryEntrepriseParSirenApi = gql`
  query EntrepriseParSirenApi($siren: String!) {
    entrepriseParSirenApi(siren: $siren) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

const mutationEntrepriseCreer = gql`
  mutation EntrepriseCreer($entreprise: InputEntreprise!) {
    entrepriseCreer(entreprise: $entreprise) {
      ...entreprise
    }
  }

  ${fragmentEntreprise}
`

export {
  queryEntreprise,
  queryEntreprises,
  queryEntrepriseParSirenDatabase,
  queryEntrepriseParSirenApi,
  mutationEntrepriseCreer
}
