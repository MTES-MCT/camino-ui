import gql from 'graphql-tag'

const fragmentEntreprise = gql`
  fragment entreprise on Entreprise {
    id
    nom
    etablissements {
      id
      nom
      dateDebut
      dateFin
      legalSiret
    }
    paysId
    legalSiren
    legalEtranger
    legalForme
    adresse
    codePostal
    commune
    cedex
    url
    telephone
    email
  }
`

export default fragmentEntreprise
