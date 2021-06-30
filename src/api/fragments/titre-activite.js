import gql from 'graphql-tag'
import { fragmentTitresEntreprises } from './entreprises'
import { fragmentDocument } from './documents'
import { fragmentActiviteType, fragmentActiviteStatut } from './metas-activites'

const fragmentTitreActivite = gql`
  fragment titreActivite on Activite {
    id
    type {
      ...activiteType
    }
    statut {
      ...activiteStatut
    }
    date
    annee
    periode
    dateSaisie
    sections
    contenu

    suppression
    modification
    documentsCreation
    deposable

    documents {
      ...document
    }
  }

  ${fragmentActiviteType}

  ${fragmentActiviteStatut}

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
    dateSaisie
    sections
    contenu

    suppression
    modification
    documentsCreation
    deposable
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
    dateSaisie
    sections
    contenu

    documents {
      ...document
    }

    suppression
    modification
    documentsCreation
    deposable
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
    deposable
  }
`

export {
  fragmentActivites,
  fragmentActivite,
  fragmentTitreActivite,
  fragmentTitresActivite
}
