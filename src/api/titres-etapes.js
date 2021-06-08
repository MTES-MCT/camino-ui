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
import { fragmentEtape, fragmentEtapeHeritage } from './fragments/titre-etape'
import { fragmentEtapeMetasEntreprises } from './fragments/entreprises'

const titreEtapeEtapesTypes = apiGraphQLFetch(
  gql`
    query TitreEtapeEtapesTypes(
      $titreDemarcheId: ID!
      $date: String!
      $id: ID
    ) {
      etapesTypes(
        titreDemarcheId: $titreDemarcheId
        titreEtapeId: $id
        date: $date
      ) {
        ...etapeType
      }
    }

    ${fragmentEtapeType}
  `
)

const titreEtapeMetas = apiGraphQLFetch(
  gql`
    query TitreEtapeMetas($titreDemarcheId: ID!, $id: ID) {
      demarche(id: $titreDemarcheId) {
        id
        type {
          nom
        }
        titre {
          id
          nom
          domaine {
            id
          }
          type {
            type {
              id
            }
          }
        }
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

      entreprises(archive: false, etapeId: $id) {
        elements {
          ...etapeMetasEntreprises
        }
      }
    }

    ${fragmentUnite}

    ${fragmentDevise}

    ${fragmentSubstance}

    ${fragmentEtapeMetasEntreprises}

    ${fragmentGeoSysteme}
  `
)

const etape = apiGraphQLFetch(gql`
  query Etape($id: ID!) {
    etape(id: $id) {
      ...etape
    }
  }

  ${fragmentEtape}
`)

const etapeHeritage = apiGraphQLFetch(gql`
  query EtapeHeritage($titreDemarcheId: ID!, $date: String!, $typeId: ID!) {
    etapeHeritage(
      titreDemarcheId: $titreDemarcheId
      date: $date
      typeId: $typeId
    ) {
      ...etapeHeritage
    }
  }

  ${fragmentEtapeHeritage}
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

const etapeDeposer = apiGraphQLFetch(gql`
  mutation EtapeDeposer($id: ID!) {
    etapeDeposer(id: $id) {
      id
    }
  }
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

export {
  etape,
  etapeHeritage,
  titreEtapeMetas,
  titreEtapeEtapesTypes,
  etapeCreer,
  etapeModifier,
  etapeSupprimer,
  etapeDeposer,
  etapeEntreprises
}
