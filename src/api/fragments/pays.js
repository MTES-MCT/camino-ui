import gql from 'graphql-tag'

const fragmentPays = gql`
  fragment pays on Pays {
    id
    nom
    regions {
      id
      nom
      departements {
        id
        nom
        communes {
          id
          nom
        }
      }
    }
  }
`

export { fragmentPays }
