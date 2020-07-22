import gql from 'graphql-tag'
import { apiFetch } from './_client'

const definitions = apiFetch(
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

const domaines = apiFetch(
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

const demarchesStatuts = apiFetch(
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

const demarchesTypes = apiFetch(
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

const etapesStatuts = apiFetch(
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

const etapesTypes = apiFetch(
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

const substancesLegales = apiFetch(
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

const titresStatuts = apiFetch(
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

const titresTypesTypes = apiFetch(
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
