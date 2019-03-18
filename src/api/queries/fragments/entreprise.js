import gql from 'graphql-tag'

const fragmentEntreprise = gql`
  fragment entreprise on Entreprise {
    id
    etablissements {
      id
      nom
      dateDebut
      dateFin
      legalSiret
    }
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
  }
`

export default fragmentEntreprise
