import gql from 'graphql-tag'

const administrationFragment = gql`
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
    utilisateurs {
      ...utilisateur
    }
  }
`

export default administrationFragment
