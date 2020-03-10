import gql from 'graphql-tag'
import { apiQuery } from './_utils'

import { fragmentAdministration } from './fragments/administration'
import { fragmentAdministrations } from './fragments/administrations'

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
