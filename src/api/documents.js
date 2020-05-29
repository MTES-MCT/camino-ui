import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'
import {
  fragmentDocument,
  fragmentDocumentsEntreprises
} from './fragments/documents'

const metasDocument = apiQuery(
  gql`
    query MetasDocument {
      documentsTypes {
        id
        nom
      }
    }
  `,
  { fetchPolicy: 'network-only' }
)

const documents = apiQuery(
  gql`
    query Documents($entreprisesIds: [ID!]) {
      documents(entreprisesIds: $entreprisesIds) {
        ...documentsEntreprises
      }
    }

    ${fragmentDocumentsEntreprises}
  `
)

const documentCreer = apiMutate(gql`
  mutation DocumentCreer($document: InputDocumentCreation!) {
    documentCreer(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentModifier = apiMutate(gql`
  mutation DocumentModifier($document: InputDocumentModification!) {
    documentModifier(document: $document) {
      ...document
    }
  }

  ${fragmentDocument}
`)

const documentSupprimer = apiMutate(gql`
  mutation DocumentSupprimer($id: ID!) {
    documentSupprimer(id: $id)
  }
`)

export {
  metasDocument,
  documentCreer,
  documentModifier,
  documentSupprimer,
  documents
}
