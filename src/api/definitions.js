import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

const definitions = apiGraphQLFetch(
  gql`
    query Definitions {
      definitions {
        id
        nom
        slug
        description
        couleur
        elements {
          id
          nom
          description
          couleur
        }
      }
    }
  `
)

const domaines = apiGraphQLFetch(
  gql`
    query Domaines {
      domaines {
        id
        nom
        description
        ordre
      }
    }
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

const titresStatuts = apiGraphQLFetch(
  gql`
    query Statuts {
      statuts {
        id
        nom
        description
        couleur
        ordre
      }
    }
  `
)

const titresTypesTypes = apiGraphQLFetch(
  gql`
    query Types {
      types {
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
  domaines,
  demarchesStatuts,
  demarchesTypes,
  etapesTypes,
  etapesStatuts,
  substancesLegales,
  titresStatuts,
  titresTypesTypes
}
