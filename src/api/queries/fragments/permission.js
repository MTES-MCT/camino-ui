import gql from 'graphql-tag'

const fragmentPermission = gql`
  fragment permission on Permission {
    id
    nom
  }
`

export default fragmentPermission
