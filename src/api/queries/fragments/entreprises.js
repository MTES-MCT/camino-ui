import gql from 'graphql-tag'

const fragmentEntreprises = gql`
  fragment entreprises on Entreprise {
    id
    nom
    paysId
    legalSiren
    legalEtranger
    legalForme
    adresse
    codePostal
    commune
    cedex
    url
  }
`
export default fragmentEntreprises
