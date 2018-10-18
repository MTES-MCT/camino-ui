import gql from 'graphql-tag'

const fragmentTitreSubstance = gql`
  fragment substance on TitreSubstance {
    id
    nom
    connexe
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

export default fragmentTitreSubstance
