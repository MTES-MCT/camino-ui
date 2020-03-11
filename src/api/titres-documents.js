import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'

import { fragmentTitre } from './fragments/titre'

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

const documentCreer = apiMutate(gql`
  mutation DocumentCreer($document: InputDocumentCreation!) {
    documentCreer(document: $document) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const documentModifier = apiMutate(gql`
  mutation DocumentModifier($document: InputDocumentModification!) {
    documentModifier(document: $document) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const documentSupprimer = apiMutate(gql`
  mutation DocumentSupprimer($id: ID!) {
    documentSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export { metasDocument, documentCreer, documentModifier, documentSupprimer }
