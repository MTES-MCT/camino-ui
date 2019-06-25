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
    utilisateurs {
      id
      email
      nom
      prenom
    }
  }
`

const fragmentEntrepriseList = gql`
  fragment entrepriseList on Entreprise {
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

export { fragmentEntreprise, fragmentEntrepriseList }
