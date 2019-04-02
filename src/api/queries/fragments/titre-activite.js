import gql from 'graphql-tag'

const fragmentTitreActivite = gql`
  fragment titreActivite on TitreActivite {
    id
    date
    statut {
      id
      nom
      couleur
    }
    periode
    annee
    sections
    type {
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
      }
    }
    dateSaisie
    contenu
  }
`

const fragmentTitresActivite = gql`
  fragment titresActivite on TitreActivite {
    id
    date
    statut {
      id
      couleur
    }
  }
`

export { fragmentTitreActivite, fragmentTitresActivite }
