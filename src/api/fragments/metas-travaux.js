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
    travauxType {
      id
      nom
    }
    travauxEtapeTypeId
    travauxEtapeType {
      id
      nom
    }
    ordre
  }
`

const fragmentTravauxEtapeTypeDocumentType = gql`
  fragment travauxEtapeTypeDocumentType on TravauxEtapeTypeDocumentType {
    travauxEtapeTypeId
    travauxEtapeType {
      id
      nom
    }
    documentTypeId
    documentType {
      id
      nom
    }
    optionnel
  }
`

const fragmentTravauxEtapeTypeEtapeStatut = gql`
  fragment travauxEtapeTypeEtapeStatut on TravauxEtapeTypeEtapeStatut {
    travauxEtapeTypeId
    travauxEtapeType {
      id
      nom
    }
    etapeStatutId
    etapeStatut {
      id
      nom
    }
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
