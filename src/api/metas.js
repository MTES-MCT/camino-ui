import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import {
  fragmentDefinition,
  fragmentDomaine,
  fragmentTitreTypeType,
  fragmentTitreStatut,
  fragmentDemarcheType,
  fragmentDemarcheStatut,
  fragmentPhaseStatut,
  fragmentEtapeType,
  fragmentEtapeStatut,
  fragmentTravauxType,
  fragmentDevise,
  fragmentUnite,
  fragmentAdministrationType,
  fragmentPermission,
  fragmentDocumentType,
  fragmentReferenceType,
  fragmentGeoSysteme
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

const titreTypeModifier = apiGraphQLFetch(gql`
  mutation TitreTypeModifier($element: InputTitreTypeType!) {
    titreTypeModifier(titreType: $element) {
      ...titreTypeType
    }
  }

  ${fragmentTitreTypeType}
`)

const titreStatutModifier = apiGraphQLFetch(gql`
  mutation TitreStatutModifier($element: InputTitreStatut!) {
    titreStatutModifier(titreStatut: $element) {
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

const demarchesTypes = apiGraphQLFetch(
  gql`
    query DemarchesTypes {
      demarchesTypes {
        ...demarcheType
      }
    }

    ${fragmentDemarcheType}
  `
)

const demarcheTypeModifier = apiGraphQLFetch(gql`
  mutation DemarcheTypeModifier($element: InputDemarcheType!) {
    demarcheTypeModifier(demarcheType: $element) {
      ...demarcheType
    }
  }

  ${fragmentDemarcheType}
`)

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
  mutation travauxTypeModifier($element: InputTravauxType!) {
    travauxTypeModifier(travauxType: $element) {
      ...travauxType
    }
  }

  ${fragmentTravauxType}
`)

const demarchesStatuts = apiGraphQLFetch(
  gql`
    query DemarchesStatuts {
      demarchesStatuts {
        ...demarcheStatut
      }
    }

    ${fragmentDemarcheStatut}
  `
)

const demarcheStatutModifier = apiGraphQLFetch(gql`
  mutation DemarcheStatutModifier($element: InputDemarcheStatut!) {
    demarcheStatutModifier(demarcheStatut: $element) {
      ...demarcheStatut
    }
  }

  ${fragmentDemarcheStatut}
`)

const phasesStatuts = apiGraphQLFetch(
  gql`
    query PhasesStatuts {
      phasesStatuts {
        ...phaseStatut
      }
    }

    ${fragmentPhaseStatut}
  `
)

const phaseStatutModifier = apiGraphQLFetch(gql`
  mutation PhaseStatutModifier($element: InputPhaseStatut!) {
    phaseStatutModifier(phaseStatut: $element) {
      ...phaseStatut
    }
  }

  ${fragmentPhaseStatut}
`)

const etapesStatuts = apiGraphQLFetch(
  gql`
    query EtapesStatuts {
      etapesStatuts {
        ...etapeStatut
      }
    }

    ${fragmentEtapeStatut}
  `
)

const etapesTypes = apiGraphQLFetch(
  gql`
    query EtapesTypes {
      etapesTypes {
        ...etapeType
      }
    }

    ${fragmentEtapeType}
  `
)

const etapeTypeModifier = apiGraphQLFetch(gql`
  mutation EtapeTypeModifier($element: InputEtapeType!) {
    etapeTypeModifier(etapeType: $element) {
      ...etapeType
    }
  }

  ${fragmentEtapeType}
`)

const etapeStatutModifier = apiGraphQLFetch(gql`
  mutation EtapeStatutModifier($element: InputEtapeStatut!) {
    etapeStatutModifier(etapeStatut: $element) {
      ...etapeStatut
    }
  }

  ${fragmentEtapeStatut}
`)

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

const unites = apiGraphQLFetch(
  gql`
    query unites {
      unites {
        ...unite
      }
    }

    ${fragmentUnite}
  `
)

const uniteModifier = apiGraphQLFetch(gql`
  mutation UniteModifier($element: InputUnite!) {
    uniteModifier(unite: $element) {
      ...unite
    }
  }

  ${fragmentUnite}
`)

const devises = apiGraphQLFetch(
  gql`
    query Devises {
      devises {
        ...devise
      }
    }

    ${fragmentDevise}
  `
)

const administrationsTypes = apiGraphQLFetch(
  gql`
    query AdministrationsTypes {
      administrationsTypes {
        ...administrationType
      }
    }

    ${fragmentAdministrationType}
  `
)

const deviseModifier = apiGraphQLFetch(gql`
  mutation DeviseModifier($element: InputDevise!) {
    deviseModifier(devise: $element) {
      ...devise
    }
  }

  ${fragmentDevise}
`)

const administrationTypeModifier = apiGraphQLFetch(gql`
  mutation AdministrationTypeModifier($element: InputAdministrationType!) {
    administrationTypeModifier(administrationType: $element) {
      ...administrationType
    }
  }

  ${fragmentAdministrationType}
`)

const permissions = apiGraphQLFetch(
  gql`
    query Permissions {
      permissions {
        ...permission
      }
    }

    ${fragmentPermission}
  `
)

const permissionModifier = apiGraphQLFetch(gql`
  mutation permissionModifier($element: InputPermission!) {
    permissionModifier(permission: $element) {
      ...permission
    }
  }

  ${fragmentPermission}
`)

const documentsTypes = apiGraphQLFetch(
  gql`
    query DocumentsTypes {
      documentsTypes {
        ...documentType
      }
    }

    ${fragmentDocumentType}
  `
)

const documentTypeModifier = apiGraphQLFetch(gql`
  mutation documentTypeModifier($element: InputDocumentType!) {
    documentTypeModifier(documentType: $element) {
      ...documentType
    }
  }

  ${fragmentDocumentType}
`)

const referencesTypes = apiGraphQLFetch(
  gql`
    query ReferencesTypes {
      referencesTypes {
        ...referenceType
      }
    }

    ${fragmentReferenceType}
  `
)

const referenceTypeModifier = apiGraphQLFetch(gql`
  mutation ReferenceTypeModifier($element: InputReferenceType!) {
    referenceTypeModifier(referenceType: $element) {
      ...referenceType
    }
  }

  ${fragmentReferenceType}
`)

const geoSystemes = apiGraphQLFetch(
  gql`
    query GeoSystemes {
      geoSystemes {
        ...geoSysteme
      }
    }

    ${fragmentGeoSysteme}
  `
)

const geoSystemeModifier = apiGraphQLFetch(gql`
  mutation GeoSystemeModifier($element: InputGeoSysteme!) {
    geoSystemeModifier(geoSysteme: $element) {
      ...geoSysteme
    }
  }

  ${fragmentGeoSysteme}
`)

export {
  definitions,
  definitionModifier,
  domaines,
  domaineModifier,
  titresTypesTypes,
  titreTypeModifier,
  titresStatuts,
  titreStatutModifier,
  demarchesTypes,
  demarcheTypeModifier,
  travauxTypes,
  travauxTypeModifier,
  demarchesStatuts,
  demarcheStatutModifier,
  phasesStatuts,
  phaseStatutModifier,
  etapesTypes,
  etapeTypeModifier,
  etapesStatuts,
  etapeStatutModifier,
  substancesLegales,
  permissions,
  devises,
  deviseModifier,
  unites,
  uniteModifier,
  administrationsTypes,
  administrationTypeModifier,
  permissionModifier,
  documentsTypes,
  documentTypeModifier,
  referencesTypes,
  referenceTypeModifier,
  geoSystemes,
  geoSystemeModifier
}
