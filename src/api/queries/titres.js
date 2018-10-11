import gql from 'graphql-tag'
import titreFragment from './titre-fragment'
import titresFragment from './titres-fragment'

const queryTitre = gql`
  query Titre($id: ID!) {
    titre(id: $id) {
      ...titre
    }
  }

  ${titreFragment}
`

const queryTitres = gql`
  query Titres(
    $typeIds: [TypeId!]
    $domaineIds: [DomaineId!]
    $statutIds: [StatutId!]
    $substances: [String!]
    $noms: [String!]
  ) {
    metas {
      ...meta
    }
    titres(
      typeIds: $typeIds
      domaineIds: $domaineIds
      statutIds: $statutIds
      substances: $substances
      noms: $noms
    ) {
      ...titre
    }
  }

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

  ${titresFragment}
`

export { queryTitre, queryTitres }
