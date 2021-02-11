import gql from 'graphql-tag'

const fragmentTitreAdministrations = gql`
  fragment titreAdministrations on Administration {
    id
    nom
    service
    adresse1
    adresse2
    codePostal
    commune
    cedex
    url
    telephone
    email
  }
`

const fragmentAdministrations = gql`
  fragment administrations on Administration {
    id
    nom
    abreviation
    service
    membre
    type {
      nom
    }
  }
`

export { fragmentAdministrations, fragmentTitreAdministrations }
