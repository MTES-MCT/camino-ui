import gql from 'graphql-tag'

const fragmentTitreActivite = gql`
  fragment activite on TitreActivite {
    id
    titreId
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

export default fragmentTitreActivite
