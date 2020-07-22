import gql from 'graphql-tag'
import { apiFetch } from './_client'
import { fragmentDocument } from './fragments/documents'

const metasDocument = apiFetch(
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

const documentCreer = apiFetch(gql`
  mutation DocumentCreer($document: InputDocumentCreation!) {
    documentCreer(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentModifier = apiFetch(gql`
  mutation DocumentModifier($document: InputDocumentModification!) {
    documentModifier(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentSupprimer = apiFetch(gql`
  mutation DocumentSupprimer($id: ID!) {
    documentSupprimer(id: $id)
  }
`)

export { metasDocument, documentCreer, documentModifier, documentSupprimer }
