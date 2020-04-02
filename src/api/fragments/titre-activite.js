import gql from 'graphql-tag'
import { fragmentTitresEntreprises } from './entreprises'

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
  }
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
  }

  ${fragmentActiviteType}
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

    modification
  }

  ${fragmentActiviteType}

  ${fragmentTitresEntreprises}
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

export {
  fragmentActiviteType,
  fragmentActivite,
  fragmentTitreActivite,
  fragmentTitresActivite
}
