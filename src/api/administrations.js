import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentAdministration } from './fragments/administration'
import { fragmentAdministrations } from './fragments/administrations'

const administration = apiGraphQLFetch(gql`
  query Administration($id: ID!) {
    administration(id: $id) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrations = apiGraphQLFetch(gql`
  query Administrations {
    administrations {
      ...administrations
    }
  }

  ${fragmentAdministrations}
`)

export { administration, administrations }
