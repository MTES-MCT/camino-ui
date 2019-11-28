import gql from 'graphql-tag'
import { fragmentActiviteType } from './metas'

const fragmentTitreActivite = gql`
  fragment titreActivite on Activite {
    id
    date
    statut {
      id
      nom
      couleur
    }
    periode
    annee
    type {
      ...activiteType
    }
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

export { fragmentTitreActivite, fragmentTitresActivite }
