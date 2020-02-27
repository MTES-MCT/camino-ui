import gql from 'graphql-tag'
import { fragmentTitre, fragmentTitres } from './fragments/titre'

import { apiQuery, apiMutate } from './_utils'

const titre = apiQuery(
  gql`
    query Titre($id: ID!) {
      titre(id: $id) {
        ...titre
      }
    }

    ${fragmentTitre}
  `,
  { fetchPolicy: 'network-only' }
)

const titres = apiQuery(
  gql`
    query Titres(
      $typesIds: [ID!]
      $domainesIds: [ID!]
      $statutsIds: [ID!]
      $substances: String
      $noms: String
      $entreprises: String
      $references: String
      $territoires: String
    ) {
      titres(
        typesIds: $typesIds
        domainesIds: $domainesIds
        statutsIds: $statutsIds
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
  `,
  { fetchPolicy: 'network-only' }
)

const titreCreer = apiMutate(gql`
  mutation TitreCreer($titre: InputTitreCreation!) {
    titreCreer(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreModifier = apiMutate(gql`
  mutation TitreModifier($titre: InputTitreModification!) {
    titreModifier(titre: $titre) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const titreSupprimer = apiMutate(gql`
  mutation TitreSupprimer($id: ID!) {
    titreSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheCreer = apiMutate(gql`
  mutation DemarcheCreer($demarche: InputDemarcheCreation!) {
    demarcheCreer(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheModifier = apiMutate(gql`
  mutation DemarcheModifier($demarche: InputDemarcheModification!) {
    demarcheModifier(demarche: $demarche) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const demarcheSupprimer = apiMutate(gql`
  mutation DemarcheSupprimer($id: ID!) {
    demarcheSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeCreer = apiMutate(gql`
  mutation EtapeCreer($etape: InputEtapeCreation!) {
    etapeCreer(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeModifier = apiMutate(gql`
  mutation EtapeModifier($etape: InputEtapeModification!) {
    etapeModifier(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeSupprimer = apiMutate(gql`
  mutation EtapeSupprimer($id: ID!) {
    etapeSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const documentCreer = apiMutate(gql`
  mutation DocumentCreer($document: InputDocumentCreation!) {
    documentCreer(document: $document) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const documentModifier = apiMutate(gql`
  mutation DocumentModifier($document: InputDocumentModification!) {
    documentModifier(document: $document) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const documentSupprimer = apiMutate(gql`
  mutation DocumentSupprimer($id: ID!) {
    documentSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  titre,
  titres,
  titreCreer,
  titreModifier,
  titreSupprimer,
  demarcheCreer,
  demarcheModifier,
  demarcheSupprimer,
  etapeCreer,
  etapeModifier,
  etapeSupprimer,
  documentCreer,
  documentModifier,
  documentSupprimer
}
