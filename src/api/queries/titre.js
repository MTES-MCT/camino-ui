import gql from 'graphql-tag'
import titreFragment from './titre-fragment'

const titre = gql`
  query Titre($id: ID!) {
    titre(id: $id) {
      ...titre
    }
  }

  ${titreFragment}
`

export default titre
