import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import { fragmentDocument } from './fragments/documents'

const metasDocument = apiGraphQLFetch(
  gql`
    query MetasDocument($repertoire: ID, $typeId: ID) {
      documentsTypes(repertoire: $repertoire, typeId: $typeId) {
        id
        nom
      }

      documentsVisibilites {
        id
        nom
      }
    }
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

export { metasDocument, documentCreer, documentModifier, documentSupprimer }
