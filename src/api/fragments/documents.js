import gql from 'graphql-tag'
import { fragmentDocumentType } from './metas'

const fragmentDocument = gql`
  fragment document on Document {
    id
    type {
      ...documentType
    }
    date
    description
    fichier
    fichierTypeId
    url
    uri
    jorf
    nor
    publicLecture
    entreprisesLecture
    modification
    suppression
  }

  ${fragmentDocumentType}
`

export { fragmentDocument }
