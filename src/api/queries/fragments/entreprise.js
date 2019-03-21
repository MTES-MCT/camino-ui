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
  }
`

export default fragmentEntreprise
