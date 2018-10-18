import gql from 'graphql-tag'
import fragmentTitre from './fragments/titre'
import fragmentTitres from './fragments/titres'

const queryTitre = gql`
  query Titre($id: ID!) {
    titre(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
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

  ${fragmentTitres}
`

export { queryTitre, queryTitres }
