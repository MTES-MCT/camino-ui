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

export { fragmentTitreAdministrations, fragmentTitresAdministrations }
