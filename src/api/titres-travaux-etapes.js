import gql from 'graphql-tag'
import { apiFetch } from './_client'

import { fragmentTitre } from './fragments/titre'
import { fragmentEtapeType } from './fragments/metas'

const metasTitreTravauxEtape = apiFetch(
  gql`
    query MetasTravauxEtape($titreTravauxId: ID!, $id: ID) {
      etapesTypes(titreTravauxId: $titreTravauxId, titreEtapeId: $id) {
        ...etapeType
      }
    }

    ${fragmentEtapeType}
  `
)

const travauxEtapeCreer = apiFetch(gql`
  mutation TravauxEtapeCreer($etape: InputTravauxEtapeCreation!) {
    travauxEtapeCreer(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const travauxEtapeModifier = apiFetch(gql`
  mutation TravauxEtapeModifier($etape: InputTravauxEtapeModification!) {
    travauxEtapeModifier(etape: $etape) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const travauxEtapeSupprimer = apiFetch(gql`
  mutation TravauxEtapeSupprimer($id: ID!) {
    travauxEtapeSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export {
  metasTitreTravauxEtape,
  travauxEtapeCreer,
  travauxEtapeModifier,
  travauxEtapeSupprimer
}
