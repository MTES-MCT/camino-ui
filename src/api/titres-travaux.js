import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentTravauxType } from './fragments/metas-travaux'

const travauxMetas = apiGraphQLFetch(
  gql`
    query MetasTravaux {
      travauxTypes {
        ...travauxType
      }
    }

    ${fragmentTravauxType}
  `
)

const travauxCreer = apiGraphQLFetch(gql`
  mutation TravauxCreer($travaux: InputTravauxCreation!) {
    travauxCreer(travaux: $travaux) {
      slug
    }
  }
`)

const travauxModifier = apiGraphQLFetch(gql`
  mutation TravauxModifier($travaux: InputTravauxModification!) {
    travauxModifier(travaux: $travaux) {
      slug
    }
  }
`)

const travauxSupprimer = apiGraphQLFetch(gql`
  mutation TravauxSupprimer($id: ID!) {
    travauxSupprimer(id: $id) {
      slug
    }
  }
`)

export { travauxMetas, travauxCreer, travauxModifier, travauxSupprimer }
