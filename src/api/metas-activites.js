import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import {
  fragmentActiviteType,
  fragmentActiviteStatut,
  fragmentActiviteTypeTitreType,
  fragmentActiviteTypeDocumentType,
  fragmentActiviteTypePays
} from './fragments/metas-activites'

import { fragmentTitreTypeType } from './fragments/metas'

const activitesMetas = apiGraphQLFetch(
  gql`
    query MetasActivites {
      activitesTypes {
        ...activiteType
      }
      activitesStatuts {
        ...activiteStatut
      }
      activitesAnnees

      domaines {
        id
        nom
      }

      types {
        ...titreTypeType
      }

      statuts {
        id
        nom
        couleur
      }
    }

    ${fragmentActiviteType}

    ${fragmentActiviteStatut}

    ${fragmentTitreTypeType}
  `
)

const activitesTypes = apiGraphQLFetch(
  gql`
    query ActivitesTypes {
      activitesTypes {
        ...activiteType
      }
    }

    ${fragmentActiviteType}
  `
)

const activiteTypeModifier = apiGraphQLFetch(gql`
  mutation ActiviteTypeModifier($element: InputActiviteType!) {
    activiteTypeModifier(activiteType: $element) {
      ...activiteType
    }
  }

  ${fragmentActiviteType}
`)

const activitesStatuts = apiGraphQLFetch(
  gql`
    query ActivitesStatuts {
      activitesStatuts {
        ...activiteStatut
      }
    }

    ${fragmentActiviteStatut}
  `
)

const activiteStatutModifier = apiGraphQLFetch(gql`
  mutation ActiviteStatutModifier($element: InputActiviteStatut!) {
    activiteStatutModifier(activiteStatut: $element) {
      ...activiteStatut
    }
  }

  ${fragmentActiviteStatut}
`)

const activitesTypesTitresTypes = apiGraphQLFetch(
  gql`
    query ActivitesTypesTitresTypes {
      activitesTypesTitresTypes {
        ...activiteTypeTitreType
      }
    }

    ${fragmentActiviteTypeTitreType}
  `
)

const activiteTypeTitreTypeModifier = apiGraphQLFetch(gql`
  mutation ActiviteTypeTitreTypeModifier(
    $element: InputActiviteTypeTitreType!
  ) {
    activiteTypeTitreTypeModifier(activiteTypeTitreType: $element) {
      ...activiteTypeTitreType
    }
  }

  ${fragmentActiviteTypeTitreType}
`)

const activiteTypeTitreTypeCreer = apiGraphQLFetch(gql`
  mutation ActiviteTypeTitreTypeCreer($element: InputActiviteTypeTitreType!) {
    activiteTypeTitreTypeCreer(activiteTypeTitreType: $element) {
      ...activiteTypeTitreType
    }
  }

  ${fragmentActiviteTypeTitreType}
`)

const activiteTypeTitreTypeSupprimer = apiGraphQLFetch(gql`
  mutation ActiviteTypeTitreTypeSupprimer(
    $element: InputActiviteTypeTitreType!
  ) {
    activiteTypeTitreTypeSupprimer(activiteTypeTitreType: $element) {
      ...activiteTypeTitreType
    }
  }

  ${fragmentActiviteTypeTitreType}
`)

const activitesTypesDocumentsTypes = apiGraphQLFetch(
  gql`
    query ActivitesTypesDocumentsTypes {
      activitesTypesDocumentsTypes {
        ...activiteTypeDocumentType
      }
    }

    ${fragmentActiviteTypeDocumentType}
  `
)

const activiteTypeDocumentTypeModifier = apiGraphQLFetch(gql`
  mutation ActiviteTypeDocumentTypeModifier(
    $element: InputActiviteTypeDocumentType!
  ) {
    activiteTypeDocumentTypeModifier(activiteTypeDocumentType: $element) {
      ...activiteTypeDocumentType
    }
  }

  ${fragmentActiviteTypeDocumentType}
`)

const activiteTypeDocumentTypeCreer = apiGraphQLFetch(gql`
  mutation ActiviteTypeDocumentTypeCreer(
    $element: InputActiviteTypeDocumentType!
  ) {
    activiteTypeDocumentTypeCreer(activiteTypeDocumentType: $element) {
      ...activiteTypeDocumentType
    }
  }

  ${fragmentActiviteTypeDocumentType}
`)

const activiteTypeDocumentTypeSupprimer = apiGraphQLFetch(gql`
  mutation ActiviteTypeDocumentTypeSupprimer(
    $element: InputActiviteTypeDocumentType!
  ) {
    activiteTypeDocumentTypeSupprimer(activiteTypeDocumentType: $element) {
      ...activiteTypeDocumentType
    }
  }

  ${fragmentActiviteTypeDocumentType}
`)

const activitesTypesPays = apiGraphQLFetch(
  gql`
    query ActivitesTypesPays {
      activitesTypesPays {
        ...activiteTypePays
      }
    }

    ${fragmentActiviteTypePays}
  `
)

const activiteTypePaysModifier = apiGraphQLFetch(gql`
  mutation ActiviteTypePaysModifier($element: InputActiviteTypePays!) {
    activiteTypePaysModifier(activiteTypePays: $element) {
      ...activiteTypePays
    }
  }

  ${fragmentActiviteTypePays}
`)

const activiteTypePaysCreer = apiGraphQLFetch(gql`
  mutation ActiviteTypePaysCreer($element: InputActiviteTypePays!) {
    activiteTypePaysCreer(activiteTypePays: $element) {
      ...activiteTypePays
    }
  }

  ${fragmentActiviteTypePays}
`)

const activiteTypePaysSupprimer = apiGraphQLFetch(gql`
  mutation ActiviteTypePaysSupprimer($element: InputActiviteTypePays!) {
    activiteTypePaysSupprimer(activiteTypePays: $element) {
      ...activiteTypePays
    }
  }

  ${fragmentActiviteTypePays}
`)

export {
  activitesMetas,
  activitesTypes,
  activiteTypeModifier,
  activitesStatuts,
  activiteStatutModifier,
  activitesTypesTitresTypes,
  activiteTypeTitreTypeCreer,
  activiteTypeTitreTypeModifier,
  activiteTypeTitreTypeSupprimer,
  activitesTypesDocumentsTypes,
  activiteTypeDocumentTypeCreer,
  activiteTypeDocumentTypeModifier,
  activiteTypeDocumentTypeSupprimer,
  activitesTypesPays,
  activiteTypePaysCreer,
  activiteTypePaysModifier,
  activiteTypePaysSupprimer
}
