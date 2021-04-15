import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import {
  fragmentTravauxType,
  fragmentTravauxTypeTravauxEtapeType
} from './fragments/metas-travaux'

const travauxTypes = apiGraphQLFetch(
  gql`
    query TravauxTypes {
      travauxTypes {
        ...travauxType
      }
    }

    ${fragmentTravauxType}
  `
)

const travauxTypeModifier = apiGraphQLFetch(gql`
  mutation TravauxTypeModifier($element: InputTravauxType!) {
    travauxTypeModifier(travauxType: $element) {
      ...travauxType
    }
  }

  ${fragmentTravauxType}
`)

const travauxTypesTravauxEtapesTypes = apiGraphQLFetch(
  gql`
    query travauxTypesTravauxEtapesTypes {
      travauxTypesTravauxEtapesTypes {
        ...travauxTypeTravauxEtapeType
      }
    }

    ${fragmentTravauxTypeTravauxEtapeType}
  `
)

const travauxTypeTravauxEtapeTypeModifier = apiGraphQLFetch(gql`
  mutation travauxTypeTravauxEtapeTypeModifier(
    $element: InputTravauxTypeTravauxEtapeType!
  ) {
    travauxTypeTravauxEtapeTypeModifier(travauxTypeTravauxEtapeType: $element) {
      ...travauxTypeTravauxEtapeType
    }
  }

  ${fragmentTravauxTypeTravauxEtapeType}
`)

const travauxTypeTravauxEtapeTypeCreer = apiGraphQLFetch(gql`
  mutation travauxTypeTravauxEtapeTypeCreer(
    $element: InputTravauxTypeTravauxEtapeType!
  ) {
    travauxTypeTravauxEtapeTypeCreer(travauxTypeTravauxEtapeType: $element) {
      ...travauxTypeTravauxEtapeType
    }
  }

  ${fragmentTravauxTypeTravauxEtapeType}
`)

const travauxTypeTravauxEtapeTypeSupprimer = apiGraphQLFetch(gql`
  mutation travauxTypeTravauxEtapeTypeSupprimer(
    $element: InputTravauxTypeTravauxEtapeType!
  ) {
    travauxTypeTravauxEtapeTypeSupprimer(
      travauxTypeTravauxEtapeType: $element
    ) {
      ...travauxTypeTravauxEtapeType
    }
  }

  ${fragmentTravauxTypeTravauxEtapeType}
`)

export {
  travauxTypes,
  travauxTypeModifier,
  travauxTypesTravauxEtapesTypes,
  travauxTypeTravauxEtapeTypeModifier,
  travauxTypeTravauxEtapeTypeCreer,
  travauxTypeTravauxEtapeTypeSupprimer
}
