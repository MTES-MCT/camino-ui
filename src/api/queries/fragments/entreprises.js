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
    etablissements {
      id
      nom
      dateDebut
      dateFin
    }
  }
`
export default fragmentEntreprises
