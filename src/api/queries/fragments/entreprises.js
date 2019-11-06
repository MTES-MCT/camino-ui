import gql from 'graphql-tag'

const fragmentEntreprises = gql`
  fragment entreprises on Entreprise {
    id
    nom
    paysId
    legalSiren
    legalEtranger
  }
`
export default fragmentEntreprises
