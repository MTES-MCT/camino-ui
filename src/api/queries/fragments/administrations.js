import gql from 'graphql-tag'

const fragmentAdministrations = gql`
  fragment administrations on Administration {
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

export default fragmentAdministrations
