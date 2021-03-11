import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentAdministration } from './fragments/administration'
import { fragmentAdministrations } from './fragments/administrations'
import { fragmentAdministrationType } from './fragments/metas'

const administrationMetas = apiGraphQLFetch(
  gql`
    query AdministrationMetas {
      administrationsTypes {
        ...administrationType
      }

      regions {
        id
        nom
      }

      departements {
        id
        nom
      }
    }

    ${fragmentAdministrationType}
  `
)

const administrationPermissionsMetas = apiGraphQLFetch(
  gql`
    query AdministrationPermissionsMetas {
      domaines {
        id
        nom
        titresTypes {
          id
          type {
            id
            nom
          }
        }
      }
      statuts {
        id
        nom
      }
      etapesTypes {
        id
        nom
      }
      activitesTypes {
        id
        nom
      }
    }
  `
)

const administration = apiGraphQLFetch(gql`
  query Administration($id: ID!) {
    administration(id: $id) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrationsMetas = apiGraphQLFetch(
  gql`
    query AdministrationsMetas {
      administrationsTypes {
        id
        nom
        ordre
      }
    }
  `
)

const administrations = apiGraphQLFetch(gql`
  query Administrations(
    $intervalle: Int
    $page: Int
    $colonne: String
    $ordre: String
    $noms: String
    $typesIds: [ID]
  ) {
    administrations(
      intervalle: $intervalle
      page: $page
      colonne: $colonne
      ordre: $ordre
      noms: $noms
      typesIds: $typesIds
    ) {
      elements {
        ...administrations
      }
      total
    }
  }

  ${fragmentAdministrations}
`)

const administrationModifier = apiGraphQLFetch(gql`
  mutation AdministrationModifier($administration: InputAdministration!) {
    administrationModifier(administration: $administration) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrationTitreTypeUpdate = apiGraphQLFetch(gql`
  mutation AdministrationTitreTypeModifier(
    $administrationTitreType: InputAdministrationTitreType!
  ) {
    administrationTitreTypeModifier(
      administrationTitreType: $administrationTitreType
    ) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrationActiviteTypeUpdate = apiGraphQLFetch(gql`
  mutation AdministrationActiviteTypeModifier(
    $administrationActiviteType: InputAdministrationActiviteType!
  ) {
    administrationActiviteTypeModifier(
      administrationActiviteType: $administrationActiviteType
    ) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrationTitreTypeTitreStatutUpdate = apiGraphQLFetch(gql`
  mutation AdministrationTitreTypeTitreStatutModifier(
    $administrationTitreTypeTitreStatut: InputAdministrationTitreTypeTitreStatut!
  ) {
    administrationTitreTypeTitreStatutModifier(
      administrationTitreTypeTitreStatut: $administrationTitreTypeTitreStatut
    ) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

const administrationTitreTypeEtapeTypeUpdate = apiGraphQLFetch(gql`
  mutation AdministrationTitreTypeEtapeTypeModifier(
    $administrationTitreTypeEtapeType: InputAdministrationTitreTypeEtapeType!
  ) {
    administrationTitreTypeEtapeTypeModifier(
      administrationTitreTypeEtapeType: $administrationTitreTypeEtapeType
    ) {
      ...administration
    }
  }

  ${fragmentAdministration}
`)

export {
  administrationMetas,
  administration,
  administrationsMetas,
  administrations,
  administrationModifier,
  administrationTitreTypeUpdate,
  administrationTitreTypeTitreStatutUpdate,
  administrationTitreTypeEtapeTypeUpdate,
  administrationActiviteTypeUpdate,
  administrationPermissionsMetas
}
