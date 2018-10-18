import gql from 'graphql-tag'

const fragmentSubstance = gql`
  fragment substance on Substance {
    id
    nom
    symbole
    gerep
    description
    legales {
      id
      nom
      description
      domaine {
        id
        nom
      }
      code {
        id
        nom
        description
        lien
      }
    }
  }
`

export default fragmentSubstance
