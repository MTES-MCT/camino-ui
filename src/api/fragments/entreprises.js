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

const fragmentTitresEntreprises = gql`
  fragment titresEntreprises on Entreprise {
    id
    nom
    legalSiren
    legalEtranger
  }
`

export {
  fragmentEntreprises,
  fragmentTitreEntreprises,
  fragmentTitresEntreprises
}
