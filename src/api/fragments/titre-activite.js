import gql from 'graphql-tag'
import { fragmentTitresEntreprises } from './entreprises'
import { fragmentDocument } from './documents'
import { fragmentDocumentType } from './metas'

const fragmentActiviteType = gql`
  fragment activiteType on ActiviteType {
    id
    nom
    pays {
      id
      nom
    }
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
  }

  ${fragmentDocumentType}
`

const fragmentTitreActivite = gql`
  fragment titreActivite on Activite {
    id
    type {
      ...activiteType
    }
    statut {
      id
      nom
      couleur
    }
    date
    annee
    periode
    dateSaisie
    sections
    contenu

    modification
    documentsCreation

    documents {
      ...document
    }
  }

  ${fragmentActiviteType}

  ${fragmentDocument}
`

const fragmentActivites = gql`
  fragment activites on Activite {
    id
    titre {
      id
      nom
      titulaires {
        ...titresEntreprises
      }
      amodiataires {
        ...titresEntreprises
      }
    }
    type {
      ...activiteType
    }
    statut {
      id
      nom
      couleur
    }
    date
    annee
    periode
    frequencePeriodeId
    dateSaisie
    sections
    contenu

    modification
    documentsCreation
  }

  ${fragmentActiviteType}

  ${fragmentTitresEntreprises}
`

const fragmentActivite = gql`
  fragment activite on Activite {
    id
    titre {
      id
      nom
      titulaires {
        ...titresEntreprises
      }
      amodiataires {
        ...titresEntreprises
      }
    }
    type {
      ...activiteType
    }
    statut {
      id
      nom
      couleur
    }
    date
    annee
    periode
    frequencePeriodeId
    dateSaisie
    sections
    contenu

    documents {
      ...document
    }

    modification
    documentsCreation
  }

  ${fragmentActiviteType}

  ${fragmentTitresEntreprises}

  ${fragmentDocument}
`

const fragmentTitresActivite = gql`
  fragment titresActivite on Activite {
    id
    date
    statut {
      id
      couleur
    }
  }
`
const fragmentActiviteStatut = gql`
  fragment activiteStatut on ActiviteStatut {
    id
    nom
    couleur
  }
`

export {
  fragmentActiviteType,
  fragmentActivites,
  fragmentActivite,
  fragmentTitreActivite,
  fragmentTitresActivite,
  fragmentActiviteStatut
}
