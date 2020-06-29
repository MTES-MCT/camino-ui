import gql from 'graphql-tag'
import { apiQuery } from './_utils'

const definitions = apiQuery(
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

const domaines = apiQuery(
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

const demarchesStatuts = apiQuery(
  gql`
    query DemarchesStatuts {
      demarchesStatuts {
        id
        nom
        description
        ordre
      }
    }
  `
)

const demarchesTypes = apiQuery(
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

const etapesStatuts = apiQuery(
  gql`
    query EtapesStatuts {
      etapesStatuts {
        id
        nom
        description
        ordre
      }
    }
  `
)

const etapesTypes = apiQuery(
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

const substancesLegales = apiQuery(
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

const titresStatuts = apiQuery(
  gql`
    query Statuts {
      statuts {
        id
        nom
        description
        ordre
      }
    }
  `
)

const titresTypesTypes = apiQuery(
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
