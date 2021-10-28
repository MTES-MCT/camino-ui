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
    titreTypeId
  }
`

const fragmentActiviteTypeDocumentType = gql`
  fragment activiteTypeDocumentType on ActiviteTypeDocumentType {
    activiteTypeId
    documentTypeId
    optionnel
  }
`

const fragmentActiviteTypePays = gql`
  fragment activiteTypePays on ActiviteTypePays {
    activiteTypeId
    paysId
  }
`

export {
  fragmentActiviteType,
  fragmentActiviteStatut,
  fragmentActiviteTypeTitreType,
  fragmentActiviteTypeDocumentType,
  fragmentActiviteTypePays
}
