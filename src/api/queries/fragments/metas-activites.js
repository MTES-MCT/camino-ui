import gql from 'graphql-tag'

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
    }
    sections
  }
`

export { fragmentActiviteType }
