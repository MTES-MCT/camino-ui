import gql from 'graphql-tag'
import {
  fragmentAdministration,
  fragmentAdministrations
} from './fragments/administration'

import { apiQuery } from './_utils'

const administration = apiQuery(gql`
  query Administration($id: ID!) {
    administration(id: $id) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrations = apiQuery(gql`
  query Administrations {
    administrations {
      ...administrations
    }
  }

  ${fragmentAdministrations}
`)

export { administration, administrations }
