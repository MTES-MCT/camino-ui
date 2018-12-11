import gql from 'graphql-tag'
import fragmentTitre from './fragments/titre'
import fragmentTitres from './fragments/titres'
import fragmentEtape from './fragments/titre-etape'

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
    $entreprises: [String!]
  ) {
    titres(
      typeIds: $typeIds
      domaineIds: $domaineIds
      statutIds: $statutIds
      substances: $substances
      noms: $noms
      entreprises: $entreprises
    ) {
      ...titre
    }
  }

  ${fragmentTitres}
`

const mutationTitreEtapeModifier = gql`
  mutation TitreEtapeModifier($etape: InputEtape!) {
    titreEtapeModifier(etape: $etape) {
      ...etape
    }
  }

  ${fragmentEtape}
`

export { queryTitre, queryTitres, mutationTitreEtapeModifier }
