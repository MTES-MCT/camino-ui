import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentTitre } from './fragments/titre'
import {
  fragmentDevise,
  fragmentEtapeType,
  fragmentGeoSysteme,
  fragmentUnite
} from './fragments/metas'
import { fragmentSubstance } from './fragments/substance'
import { fragmentEntreprise } from './fragments/entreprise'
import {
  fragmentTitreEtape,
  fragmentTitreEtapeNouvelle
} from './fragments/titre-etape'

const titreEtapeMetas = apiGraphQLFetch(
  gql`
    query TitreEtapeMetas($titreDemarcheId: ID!, $date: String!, $id: ID) {
      etapesTypes(
        titreDemarcheId: $titreDemarcheId
        date: $date
        titreEtapeId: $id
      ) {
        ...etapeType
      }

      devises {
        ...devise
      }

      unites {
        ...unite
      }

      geoSystemes {
        ...geoSysteme
      }

      substances {
        ...substance
      }
    }

    ${fragmentEtapeType}

    ${fragmentUnite}

    ${fragmentDevise}

    ${fragmentSubstance}

    ${fragmentGeoSysteme}
  `
)

const etape = apiGraphQLFetch(gql`
  query Etape($id: ID!) {
    etape(id: $id) {
      ...etape
    }
  }

  ${fragmentTitreEtape}
`)

const etapeNouvelle = apiGraphQLFetch(gql`
  query EtapeNouvelle($titreDemarcheId: ID!, $date: String!) {
    etapeNouvelle(titreDemarcheId: $titreDemarcheId, date: $date) {
      ...etapeNouvelle
    }
  }

  ${fragmentTitreEtapeNouvelle}
`)

const etapeCreer = apiGraphQLFetch(gql`
  mutation EtapeCreer($etape: InputEtapeCreation!) {
    etapeCreer(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeModifier = apiGraphQLFetch(gql`
  mutation EtapeModifier($etape: InputEtapeModification!) {
    etapeModifier(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeSupprimer = apiGraphQLFetch(gql`
  mutation EtapeSupprimer($id: ID!) {
    etapeSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeEntreprises = apiGraphQLFetch(
  gql`
    query EtapeEntreprises($etapeId: ID!, $etapeUniquement: Boolean) {
      entreprises(etapeId: $etapeId, etapeUniquement: $etapeUniquement) {
        elements {
          ...entreprise
        }
        total
      }
    }

    ${fragmentEntreprise}
  `
)

const etapeJustificatifsAssocier = apiGraphQLFetch(gql`
  mutation etapeJustificatifsAssocier($id: ID!, $documentsIds: [ID]!) {
    etapeJustificatifsAssocier(id: $id, documentsIds: $documentsIds) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const etapeJustificatifDissocier = apiGraphQLFetch(gql`
  mutation etapeJustificatifDissocier($id: ID!, $documentId: ID) {
    etapeJustificatifDissocier(id: $id, documentId: $documentId) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  etape,
  etapeNouvelle,
  titreEtapeMetas,
  etapeCreer,
  etapeModifier,
  etapeSupprimer,
  etapeJustificatifsAssocier,
  etapeJustificatifDissocier,
  etapeEntreprises
}
