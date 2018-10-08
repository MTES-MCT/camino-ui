import gql from 'graphql-tag'
import titreFragments from './titre-fragments'

const titre = gql`
  query Titre($id: String!) {
    titre(id: $id) {
      ...titre
    }
  }

  ${titreFragments}
`

export default titre
