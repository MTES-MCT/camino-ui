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

const fragmentTitreSubstance = gql`
  fragment titreSubstance on TitreSubstance {
    id
    nom
    connexe
    ordre
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

const fragmentTitresSubstance = gql`
  fragment titresSubstance on TitreSubstance {
    id
    nom
  }
`

export { fragmentSubstance, fragmentTitreSubstance, fragmentTitresSubstance }
