import gql from 'graphql-tag'
import { apiQuery } from './_utils'

const definitions = apiQuery(
  gql`
    query Definitions {
      definitions {
        id
        nom
        table
        description
        couleur
        elements {
          id
          nom
          description
          couleur
        }
      }
    }
  `,
  { fetchPolicy: 'network-only' }
)

export default definitions
