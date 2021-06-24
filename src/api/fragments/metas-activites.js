import gql from 'graphql-tag'
import { fragmentDocumentType } from './metas'

const fragmentActiviteType = gql`
  fragment activiteType on ActiviteType {
    id
    nom
    dateDebut
    delaiMois
    pays {
      id
      nom
    }
    ordre
    frequenceId
    frequence {
      id
      nom
      trimestres {
        id
        nom
        mois {
          id
          nom
        }
      }
      mois {
        id
        nom
      }
      annees {
        id
        nom
      }
    }
    sections
    documentsTypes {
      ...documentType
    }
    satisfactionUrl
    email
    description
  }

  ${fragmentDocumentType}
`

const fragmentActiviteStatut = gql`
  fragment activiteStatut on ActiviteStatut {
    id
    nom
    couleur
  }
`

const fragmentActiviteTypeTitreType = gql`
  fragment activiteTypeTitreType on ActiviteTypeTitreType {
    activiteTypeId
    activiteType {
      id
      nom
    }
    titreTypeId
    titreType {
      id
      nom
    }
  }
`

const fragmentActiviteTypeDocumentType = gql`
  fragment activiteTypeDocumentType on ActiviteTypeDocumentType {
    activiteTypeId
    activiteType {
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

const fragmentActiviteTypePays = gql`
  fragment activiteTypePays on ActiviteTypePays {
    activiteTypeId
    activiteType {
      id
      nom
    }
    paysId
    pays {
      id
      nom
    }
  }
`

export {
  fragmentActiviteType,
  fragmentActiviteStatut,
  fragmentActiviteTypeTitreType,
  fragmentActiviteTypeDocumentType,
  fragmentActiviteTypePays
}
