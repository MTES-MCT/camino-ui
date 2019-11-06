import gql from 'graphql-tag'

const fragmentTitresEntreprises = gql`
  fragment titresEntreprises on Entreprise {
    id
    nom
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
  }
`
export { fragmentTitresEntreprises, fragmentTitreEntreprises }
