import gql from 'graphql-tag'

const entrepriseFragment = gql`
  fragment entreprise on Entreprise {
    id
    nom
    raisonSociale
    paysId
    legalSiren
    legalEtranger
    legalForme
    voieNumero
    voieType
    voieNom
    adresseComplement
    codePostal
    ville
    cedex
    url
    telephone
    email
    utilisateurs {
      ...utilisateur
    }
  }
`

export default entrepriseFragment
