import gql from 'graphql-tag'

const fragmentMeta = gql`
  fragment meta on Metas {
    types {
      id
      nom
    }
    domaines {
      id
      nom
    }
    statuts {
      id
      nom
      couleur
    }
  }
`

export default fragmentMeta
