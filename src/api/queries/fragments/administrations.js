import gql from 'graphql-tag'

const fragmentAdministrations = gql`
  fragment administrations on Administration {
    id
    nom
    service
  }
`

export default fragmentAdministrations
