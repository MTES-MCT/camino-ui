import gql from 'graphql-tag'

const fragmentEntreprises = gql`
  fragment entreprises on Entreprise {
    id
    nom
    paysId
    legalSiren
    legalEtranger
    titresTypes {
      id
      domaine {
        id
        nom
      }
      type {
        id
        nom
      }
      titresCreation
    }
  }
`

const fragmentTitreEntreprises = gql`
  fragment titreEntreprises on Entreprise {
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
    operateur
  }
`

const fragmentTitresEntreprises = gql`
  fragment titresEntreprises on Entreprise {
    id
    nom
    adresse
    codePostal
    commune
    legalSiren
    legalEtranger
  }
`

export {
  fragmentEntreprises,
  fragmentTitreEntreprises,
  fragmentTitresEntreprises
}
