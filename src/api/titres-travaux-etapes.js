import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentTravauxEtapeType } from './fragments/metas-travaux'
import { fragmentTitreTravauxEtape } from './fragments/titre-travaux'

const titreTravauxEtape = apiGraphQLFetch(gql`
  query TravauxEtape($id: ID!) {
    travauxEtape(id: $id) {
      ...titreTravauxEtape
    }
  }

  ${fragmentTitreTravauxEtape}
`)

const titreTravauxEtapeMetas = apiGraphQLFetch(
  gql`
    query MetasTravauxEtape($titreTravauxId: ID!) {
      travauxEtapesTypes(titreTravauxId: $titreTravauxId) {
        ...travauxEtapeType
      }

      travaux(id: $titreTravauxId) {
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
    }

    ${fragmentTravauxEtapeType}
  `
)

const travauxEtapeCreer = apiGraphQLFetch(gql`
  mutation TravauxEtapeCreer($etape: InputTravauxEtapeCreation!) {
    travauxEtapeCreer(etape: $etape) {
      id
    }
  }
`)

const travauxEtapeModifier = apiGraphQLFetch(gql`
  mutation TravauxEtapeModifier($etape: InputTravauxEtapeModification!) {
    travauxEtapeModifier(etape: $etape) {
      id
    }
  }
`)

const travauxEtapeSupprimer = apiGraphQLFetch(gql`
  mutation TravauxEtapeSupprimer($id: ID!) {
    travauxEtapeSupprimer(id: $id) {
      id
    }
  }
`)

export {
  titreTravauxEtapeMetas,
  titreTravauxEtape,
  travauxEtapeCreer,
  travauxEtapeModifier,
  travauxEtapeSupprimer
}
