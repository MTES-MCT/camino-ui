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

const fragmentTravauxEtapeTypeDocumentType = gql`
  fragment travauxEtapeTypeDocumentType on TravauxEtapeTypeDocumentType {
    travauxEtapeTypeId
    documentTypeId
    optionnel
  }
`

const fragmentTravauxEtapeTypeEtapeStatut = gql`
  fragment travauxEtapeTypeEtapeStatut on TravauxEtapeTypeEtapeStatut {
    travauxEtapeTypeId
    etapeStatutId
    ordre
  }
`

export {
  fragmentTravauxType,
  fragmentTravauxEtapeType,
  fragmentTravauxTypeTravauxEtapeType,
  fragmentTravauxEtapeTypeDocumentType,
  fragmentTravauxEtapeTypeEtapeStatut
}
