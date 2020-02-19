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

const fragmentTitresAdministrations = gql`
  fragment titresAdministrations on Administration {
    id
    nom
  }
`

const fragmentAdministrations = gql`
  fragment administrations on Administration {
    id
    nom
    abreviation
    service
    membre
  }
`

export {
  fragmentAdministrations,
  fragmentTitreAdministrations,
  fragmentTitresAdministrations
}
