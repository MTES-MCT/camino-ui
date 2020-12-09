import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import {
  fragmentDefinition,
  fragmentDomaine,
  fragmentTitreTypeType,
  fragmentTitreStatut
} from './fragments/metas'

const definitions = apiGraphQLFetch(
  gql`
    query Definitions {
      definitions {
        ...definition
      }
    }

    ${fragmentDefinition}
  `
)

const definitionModifier = apiGraphQLFetch(gql`
  mutation DefinitionModifier($element: InputDefinition!) {
    definitionModifier(definition: $element) {
      ...definition
    }
  }

  ${fragmentDefinition}
`)

const domaines = apiGraphQLFetch(
  gql`
    query Domaines {
      domaines {
        ...domaine
      }
    }

    ${fragmentDomaine}
  `
)

const domaineModifier = apiGraphQLFetch(gql`
  mutation DomaineModifier($element: InputDomaine!) {
    domaineModifier(domaine: $element) {
      ...domaine
    }
  }

  ${fragmentDomaine}
`)

const titresTypesTypes = apiGraphQLFetch(
  gql`
    query TitresTypesTypes {
      types {
        ...titreTypeType
      }
    }

    ${fragmentTitreTypeType}
  `
)

const typeModifier = apiGraphQLFetch(gql`
  mutation TypeModifier($element: InputTitreTypeType!) {
    typeModifier(type: $element) {
      ...titreTypeType
    }
  }

  ${fragmentTitreTypeType}
`)

const statutModifier = apiGraphQLFetch(gql`
  mutation StatutModifier($element: InputTitreStatut!) {
    statutModifier(statut: $element) {
      ...titreStatut
    }
  }

  ${fragmentTitreStatut}
`)

const titresStatuts = apiGraphQLFetch(
  gql`
    query Statuts {
      statuts {
        ...titreStatut
      }
    }

    ${fragmentTitreStatut}
  `
)

const demarchesStatuts = apiGraphQLFetch(
  gql`
    query DemarchesStatuts {
      demarchesStatuts {
        id
        nom
        description
        couleur
        ordre
      }
    }
  `
)

const demarchesTypes = apiGraphQLFetch(
  gql`
    query DemarchesTypes {
      demarchesTypes {
        id
        nom
        description
        ordre
      }
    }
  `
)

const etapesStatuts = apiGraphQLFetch(
  gql`
    query EtapesStatuts {
      etapesStatuts {
        id
        nom
        description
        couleur
        ordre
      }
    }
  `
)

const etapesTypes = apiGraphQLFetch(
  gql`
    query EtapesTypes {
      etapesTypes {
        id
        nom
        description
        ordre
      }
    }
  `
)

const substancesLegales = apiGraphQLFetch(
  gql`
    query SubstancesLegales {
      substancesLegales {
        id
        nom
        description
        ordre
      }
    }
  `
)

export {
  definitions,
  definitionModifier,
  domaines,
  domaineModifier,
  titresTypesTypes,
  typeModifier,
  titresStatuts,
  statutModifier,
  demarchesStatuts,
  demarchesTypes,
  etapesTypes,
  etapesStatuts,
  substancesLegales
}
