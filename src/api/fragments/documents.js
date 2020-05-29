import gql from 'graphql-tag'

const fragmentDocument = gql`
  fragment document on Document {
    id
    type {
      id
      nom
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
`

const fragmentDocumentsEntreprises = gql`
  fragment documentsEntreprises on Document {
    id
    type {
      id
      nom
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
    entreprise {
      id
      nom
    }

    modification
    suppression
  }
`

export { fragmentDocument, fragmentDocumentsEntreprises }
