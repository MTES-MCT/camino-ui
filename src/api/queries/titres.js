import gql from 'graphql-tag'
import {fragmentTitre} from './fragments/titre'
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
    $typeIds: [ID!]
    $domaineIds: [ID!]
    $statutIds: [ID!]
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
      ...titres
    }
  }

  ${fragmentTitres}
`
const mutationTitreCreer = gql`
  mutation TitreCreer($titre: InputTitreCreation!) {
    titreCreer(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreModifier = gql`
  mutation TitreModifier($titre: InputTitreModification!) {
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

const mutationTitreDemarcheCreer = gql`
  mutation TitreDemarcheCreer($demarche: InputDemarcheCreation!) {
    titreDemarcheCreer(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreDemarcheModifier = gql`
  mutation TitreDemarcheModifier($demarche: InputDemarcheModification!) {
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

const mutationTitreEtapeCreer = gql`
  mutation TitreEtapeCreer($etape: InputEtapeCreation!) {
    titreEtapeCreer(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`

const mutationTitreEtapeModifier = gql`
  mutation TitreEtapeModifier($etape: InputEtapeModification!) {
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
  mutationTitreCreer,
  mutationTitreModifier,
  mutationTitreSupprimer,
  mutationTitreDemarcheCreer,
  mutationTitreDemarcheModifier,
  mutationTitreDemarcheSupprimer,
  mutationTitreEtapeCreer,
  mutationTitreEtapeModifier,
  mutationTitreEtapeSupprimer
}
