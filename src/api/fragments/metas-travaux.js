import gql from 'graphql-tag'
import { fragmentDocumentType } from './metas'

const fragmentTravauxType = gql`
  fragment travauxType on TravauxType {
    id
    nom
    ordre
    travauxCreation
  }
`

const fragmentTravauxEtapeType = gql`
  fragment travauxEtapeType on TravauxEtapeType {
    id
    nom
    description
    ordre
    etapesStatuts {
      id
      nom
      couleur
    }
    etapesCreation
    documentsTypes {
      ...documentType
    }
  }

  ${fragmentDocumentType}
`

const fragmentTravauxTypeTravauxEtapeType = gql`
  fragment travauxTypeTravauxEtapeType on TravauxTypeTravauxEtapeType {
    travauxTypeId
    travauxEtapeTypeId
    ordre
  }
`

export {
  fragmentTravauxType,
  fragmentTravauxEtapeType,
  fragmentTravauxTypeTravauxEtapeType
}
