import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import { fragmentDocument } from './fragments/documents'
import { fragmentDocumentType } from './fragments/metas'

const documentMetas = apiGraphQLFetch(
  gql`
    query MetasDocument($repertoire: ID, $typeId: ID) {
      documentsTypes(repertoire: $repertoire, typeId: $typeId) {
        ...documentType
      }

      documentsVisibilites {
        id
        nom
      }
    }

    ${fragmentDocumentType}
  `
)

const documentCreer = apiGraphQLFetch(gql`
  mutation DocumentCreer($document: InputDocumentCreation!) {
    documentCreer(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentModifier = apiGraphQLFetch(gql`
  mutation DocumentModifier($document: InputDocumentModification!) {
    documentModifier(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentSupprimer = apiGraphQLFetch(gql`
  mutation DocumentSupprimer($id: ID!) {
    documentSupprimer(id: $id)
  }
`)

export { documentMetas, documentCreer, documentModifier, documentSupprimer }
