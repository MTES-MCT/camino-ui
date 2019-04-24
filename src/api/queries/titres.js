import gql from 'graphql-tag'
import fragmentTitre from './fragments/titre'
import fragmentTitreList from './fragments/titres'
import { fragmentTitreDemarche } from './fragments/titre-demarche'
import fragmentTitreEtape from './fragments/titre-etape'

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
    $references: [String!]
    $territoires: [String!]
  ) {
    titres(
      typeIds: $typeIds
      domaineIds: $domaineIds
      statutIds: $statutIds
      substances: $substances
      noms: $noms
      entreprises: $entreprises
      references: $references
      territoires: $territoires
    ) {
      ...titreList
    }
  }

  ${fragmentTitreList}
`

const mutationTitreEtapeModifier = gql`
  mutation TitreEtapeModifier($etape: InputEtape!) {
    titreEtapeModifier(etape: $etape) {
      ...etape
    }
  }

  ${fragmentTitreEtape}
`

const mutationTitreEtapeSupprimer = gql`
  mutation TitreEtapeSupprimer($id: ID!) {
    titreEtapeSupprimer(id: $id) {
      ...etape
    }
  }

  ${fragmentTitreEtape}
`

const mutationTitreDemarcheModifier = gql`
  mutation TitreDemarcheModifier($demarche: InputDemarche!) {
    titreDemarcheModifier(demarche: $demarche) {
      ...titreDemarche
    }
  }

  ${fragmentTitreDemarche}
`

const mutationTitreDemarcheSupprimer = gql`
  mutation TitreDemarcheModifier($demarcheId: ID!) {
    titreDemarcheSupprimer(demarcheId: $demarcheId) {
      ...titreDemarche
    }
  }

  ${fragmentTitreDemarche}
`

export {
  queryTitre,
  queryTitres,
  mutationTitreDemarcheModifier,
  mutationTitreDemarcheSupprimer,
  mutationTitreEtapeModifier,
  mutationTitreEtapeSupprimer
}
