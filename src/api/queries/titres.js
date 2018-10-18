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

  ${fragmentTitres}
`

export { queryTitre, queryTitres }
