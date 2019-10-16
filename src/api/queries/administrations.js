import gql from 'graphql-tag'
import fragmentAdministration from './fragments/administration'
import fragmentAdministrations from './fragments/administrations'

const queryAdministration = gql`
  query Administration($id: ID!) {
    administration(id: $id) {
      ...administration
    }
  }

  ${fragmentAdministration}
`

const queryAdministrations = gql`
  query Administrations {
    administrations {
      ...administrations
    }
  }

  ${fragmentAdministrations}
`

export { queryAdministration, queryAdministrations }
