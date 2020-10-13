import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentTitre } from './fragments/titre'
import { fragmentTravauxType } from './fragments/metas'

const metasTravaux = apiGraphQLFetch(
  gql`
    query MetasTravaux($titreId: ID!, $id: ID) {
      travauxTypes(titreId: $titreId, titreTravauxId: $id) {
        ...travauxType
      }
    }

    ${fragmentTravauxType}
  `
)

const travauxCreer = apiGraphQLFetch(gql`
  mutation TravauxCreer($travaux: InputTravauxCreation!) {
    travauxCreer(travaux: $travaux) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const travauxModifier = apiGraphQLFetch(gql`
  mutation TravauxModifier($travaux: InputTravauxModification!) {
    travauxModifier(travaux: $travaux) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

const travauxSupprimer = apiGraphQLFetch(gql`
  mutation TravauxSupprimer($id: ID!) {
    travauxSupprimer(id: $id) {
      ...titre
    }
  }

  ${fragmentTitre}
`)

export { metasTravaux, travauxCreer, travauxModifier, travauxSupprimer }
