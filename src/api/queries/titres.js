import gql from 'graphql-tag'
import fragmentTitre from './fragments/titre'
import fragmentTitreList from './fragments/titres'

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

const mutationTitreModifier = gql`
  mutation TitreModifier($titre: InputTitre!) {
    titreModifier(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreSupprimer = gql`
  mutation TitreSupprimer($id: ID!) {
    titreSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreDemarcheModifier = gql`
  mutation TitreDemarcheModifier($demarche: InputDemarche!) {
    titreDemarcheModifier(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreDemarcheSupprimer = gql`
  mutation TitreDemarcheSupprimer($id: ID!) {
    titreDemarcheSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreEtapeModifier = gql`
  mutation TitreEtapeModifier($etape: InputEtape!) {
    titreEtapeModifier(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreEtapeSupprimer = gql`
  mutation TitreEtapeSupprimer($id: ID!) {
    titreEtapeSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`

export {
  queryTitre,
  queryTitres,
  mutationTitreModifier,
  mutationTitreSupprimer,
  mutationTitreDemarcheModifier,
  mutationTitreDemarcheSupprimer,
  mutationTitreEtapeModifier,
  mutationTitreEtapeSupprimer
}
