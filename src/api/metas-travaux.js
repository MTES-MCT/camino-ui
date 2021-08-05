import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import {
  fragmentTravauxType,
  fragmentTravauxEtapeType,
  fragmentTravauxTypeTravauxEtapeType,
  fragmentTravauxEtapeTypeDocumentType,
  fragmentTravauxEtapeTypeEtapeStatut
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

const travauxTypeCreer = apiGraphQLFetch(gql`
  mutation TravauxTypeCreer($element: InputTravauxType!) {
    travauxTypeCreer(travauxType: $element) {
      ...travauxType
    }
  }

  ${fragmentTravauxType}
`)

const travauxTypeModifier = apiGraphQLFetch(gql`
  mutation TravauxTypeModifier($element: InputTravauxType!) {
    travauxTypeModifier(travauxType: $element) {
      ...travauxType
    }
  }

  ${fragmentTravauxType}
`)

const travauxEtapesTypes = apiGraphQLFetch(
  gql`
    query TravauxEtapesTypes {
      travauxEtapesTypes {
        ...travauxEtapeType
      }
    }

    ${fragmentTravauxEtapeType}
  `
)

const travauxEtapeTypeCreer = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeCreer($element: InputTravauxEtapeType!) {
    travauxEtapeTypeCreer(travauxEtapeType: $element) {
      ...travauxEtapeType
    }
  }

  ${fragmentTravauxEtapeType}
`)

const travauxEtapeTypeModifier = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeModifier($element: InputTravauxEtapeType!) {
    travauxEtapeTypeModifier(travauxEtapeType: $element) {
      ...travauxEtapeType
    }
  }

  ${fragmentTravauxEtapeType}
`)

const travauxTypesTravauxEtapesTypes = apiGraphQLFetch(
  gql`
    query TravauxTypesTravauxEtapesTypes {
      travauxTypesTravauxEtapesTypes {
        ...travauxTypeTravauxEtapeType
      }
    }

    ${fragmentTravauxTypeTravauxEtapeType}
  `
)

const travauxTypeTravauxEtapeTypeModifier = apiGraphQLFetch(gql`
  mutation TravauxTypeTravauxEtapeTypeModifier(
    $element: InputTravauxTypeTravauxEtapeType!
  ) {
    travauxTypeTravauxEtapeTypeModifier(travauxTypeTravauxEtapeType: $element) {
      ...travauxTypeTravauxEtapeType
    }
  }

  ${fragmentTravauxTypeTravauxEtapeType}
`)

const travauxTypeTravauxEtapeTypeCreer = apiGraphQLFetch(gql`
  mutation TravauxTypeTravauxEtapeTypeCreer(
    $element: InputTravauxTypeTravauxEtapeType!
  ) {
    travauxTypeTravauxEtapeTypeCreer(travauxTypeTravauxEtapeType: $element) {
      ...travauxTypeTravauxEtapeType
    }
  }

  ${fragmentTravauxTypeTravauxEtapeType}
`)

const travauxTypeTravauxEtapeTypeSupprimer = apiGraphQLFetch(gql`
  mutation TravauxTypeTravauxEtapeTypeSupprimer(
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

const travauxEtapesTypesDocumentsTypes = apiGraphQLFetch(
  gql`
    query TravauxEtapesTypesDocumentsTypes {
      travauxEtapesTypesDocumentsTypes {
        ...travauxEtapeTypeDocumentType
      }
    }

    ${fragmentTravauxEtapeTypeDocumentType}
  `
)

const travauxEtapeTypeDocumentTypeModifier = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeDocumentTypeModifier(
    $element: InputTravauxEtapeTypeDocumentType!
  ) {
    travauxEtapeTypeDocumentTypeModifier(
      travauxEtapeTypeDocumentType: $element
    ) {
      ...travauxEtapeTypeDocumentType
    }
  }

  ${fragmentTravauxEtapeTypeDocumentType}
`)

const travauxEtapeTypeDocumentTypeCreer = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeDocumentTypeCreer(
    $element: InputTravauxEtapeTypeDocumentType!
  ) {
    travauxEtapeTypeDocumentTypeCreer(travauxEtapeTypeDocumentType: $element) {
      ...travauxEtapeTypeDocumentType
    }
  }

  ${fragmentTravauxEtapeTypeDocumentType}
`)

const travauxEtapeTypeDocumentTypeSupprimer = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeDocumentTypeSupprimer(
    $element: InputTravauxEtapeTypeDocumentType!
  ) {
    travauxEtapeTypeDocumentTypeSupprimer(
      travauxEtapeTypeDocumentType: $element
    ) {
      ...travauxEtapeTypeDocumentType
    }
  }

  ${fragmentTravauxEtapeTypeDocumentType}
`)

const travauxEtapesTypesEtapesStatuts = apiGraphQLFetch(
  gql`
    query TravauxEtapesTypesEtapesStatuts {
      travauxEtapesTypesEtapesStatuts {
        ...travauxEtapeTypeEtapeStatut
      }
    }

    ${fragmentTravauxEtapeTypeEtapeStatut}
  `
)

const travauxEtapeTypeEtapeStatutModifier = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeEtapeStatutModifier(
    $element: InputTravauxEtapeTypeEtapeStatut!
  ) {
    travauxEtapeTypeEtapeStatutModifier(travauxEtapeTypeEtapeStatut: $element) {
      ...travauxEtapeTypeEtapeStatut
    }
  }

  ${fragmentTravauxEtapeTypeEtapeStatut}
`)

const travauxEtapeTypeEtapeStatutCreer = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeEtapeStatutCreer(
    $element: InputTravauxEtapeTypeEtapeStatut!
  ) {
    travauxEtapeTypeEtapeStatutCreer(travauxEtapeTypeEtapeStatut: $element) {
      ...travauxEtapeTypeEtapeStatut
    }
  }

  ${fragmentTravauxEtapeTypeEtapeStatut}
`)

const travauxEtapeTypeEtapeStatutSupprimer = apiGraphQLFetch(gql`
  mutation TravauxEtapeTypeEtapeStatutSupprimer(
    $element: InputTravauxEtapeTypeEtapeStatut!
  ) {
    travauxEtapeTypeEtapeStatutSupprimer(
      travauxEtapeTypeEtapeStatut: $element
    ) {
      ...travauxEtapeTypeEtapeStatut
    }
  }

  ${fragmentTravauxEtapeTypeEtapeStatut}
`)

export {
  travauxTypes,
  travauxTypeCreer,
  travauxTypeModifier,
  travauxEtapesTypes,
  travauxEtapeTypeCreer,
  travauxEtapeTypeModifier,
  travauxTypesTravauxEtapesTypes,
  travauxTypeTravauxEtapeTypeModifier,
  travauxTypeTravauxEtapeTypeCreer,
  travauxTypeTravauxEtapeTypeSupprimer,
  travauxEtapesTypesDocumentsTypes,
  travauxEtapeTypeDocumentTypeModifier,
  travauxEtapeTypeDocumentTypeCreer,
  travauxEtapeTypeDocumentTypeSupprimer,
  travauxEtapesTypesEtapesStatuts,
  travauxEtapeTypeEtapeStatutModifier,
  travauxEtapeTypeEtapeStatutCreer,
  travauxEtapeTypeEtapeStatutSupprimer
}
