import gql from 'graphql-tag'
import { fragmentActiviteType } from './metas'

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
  }

  ${fragmentActiviteType}
`

const fragmentActivite = gql`
  fragment activite on Activite {
    id
    titre {
      id
      nom
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
  }

  ${fragmentActiviteType}
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

export { fragmentActivite, fragmentTitreActivite, fragmentTitresActivite }
