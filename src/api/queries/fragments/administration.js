import gql from 'graphql-tag'

const fragmentAdministration = gql`
  fragment administration on Administration {
    id
    nom
    service
    adresse1
    adresse2
    codePostal
    ville
    cedex
    url
    telephone
    email
  }
`

export default fragmentAdministration
