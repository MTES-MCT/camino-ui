import gql from 'graphql-tag'
import { apiMutate, apiQuery } from './_utils'

import { fragmentTitre } from './fragments/titre'
import { fragmentEtapeType, fragmentUnite } from './fragments/metas'
import { fragmentSubstance } from './fragments/substance'
import { fragmentEntreprises } from './fragments/entreprises'

const metasTitreEtape = apiQuery(
  gql`
    query MetasEtape($titreDemarcheId: ID!, $typeId: ID) {
      demarcheEtapesTypes(
        titreDemarcheId: $titreDemarcheId
        etapeTypeId: $typeId
      ) {
        ...etapeType
      }

      devises {
        id
        nom
      }

      unites {
        ...unite
      }

      geoSystemes {
        id
        nom
        zone
        unite {
          ...unite
        }
      }

      substances {
        ...substance
      }

      entreprises {
        ...entreprises
      }
    }

    ${fragmentEtapeType}

    ${fragmentUnite}

    ${fragmentSubstance}

    ${fragmentEntreprises}
  `,
  { fetchPolicy: 'network-only' }
)

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

export { metasTitreEtape, etapeCreer, etapeModifier, etapeSupprimer }
