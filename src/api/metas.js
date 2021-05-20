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
  fragmentDevise,
  fragmentUnite,
  fragmentAdministrationType,
  fragmentPermission,
  fragmentDocumentType,
  fragmentReferenceType,
  fragmentGeoSysteme,
  fragmentTitreType,
  fragmentTitreTypeTitreStatut,
  fragmentTitreTypeDemarcheType,
  fragmentTitreTypeDemarcheTypeEtapeType,
  fragmentEtapeTypeEtapeStatut,
  fragmentEtapeTypeDocumentType,
  fragmentEtapeTypeJustificatifType
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

const titreTypeTypeModifier = apiGraphQLFetch(gql`
  mutation TitreTypeTypeModifier($element: InputTitreTypeType!) {
    titreTypeTypeModifier(titreType: $element) {
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

const titresTypes = apiGraphQLFetch(
  gql`
    query TitresTypes {
      titresTypes {
        ...titreType
      }
    }

    ${fragmentTitreType}
  `
)

// tables de jointure

const titreTypeModifier = apiGraphQLFetch(gql`
  mutation TitreTypeModifier($element: InputTitreTypeModification!) {
    titreTypeModifier(titreType: $element) {
      ...titreType
    }
  }

  ${fragmentTitreType}
`)

const titreTypeCreer = apiGraphQLFetch(gql`
  mutation TitreTypeCreer($element: InputTitreTypeCreation!) {
    titreTypeCreer(titreType: $element) {
      ...titreType
    }
  }

  ${fragmentTitreType}
`)

const titreTypeSupprimer = apiGraphQLFetch(gql`
  mutation TitreTypeSupprimer($element: InputTitreTypeModification!) {
    titreTypeSupprimer(titreType: $element) {
      ...titreType
    }
  }

  ${fragmentTitreType}
`)

const titresTypesTitresStatuts = apiGraphQLFetch(
  gql`
    query TitresTypesTitresStatuts {
      titresTypesTitresStatuts {
        ...titreTypeTitreStatut
      }
    }

    ${fragmentTitreTypeTitreStatut}
  `
)

const titreTypeTitreStatutModifier = apiGraphQLFetch(gql`
  mutation TitreTypeTitreStatutModifier($element: InputTitreTypeTitreStatut!) {
    titreTypeTitreStatutModifier(titreTypeTitreStatut: $element) {
      ...titreTypeTitreStatut
    }
  }

  ${fragmentTitreTypeTitreStatut}
`)

const titreTypeTitreStatutCreer = apiGraphQLFetch(gql`
  mutation TitreTypeTitreStatutCreer($element: InputTitreTypeTitreStatut!) {
    titreTypeTitreStatutCreer(titreTypeTitreStatut: $element) {
      ...titreTypeTitreStatut
    }
  }

  ${fragmentTitreTypeTitreStatut}
`)

const titreTypeTitreStatutSupprimer = apiGraphQLFetch(gql`
  mutation titreTypeTitreStatutSupprimer($element: InputTitreTypeTitreStatut!) {
    titreTypeTitreStatutSupprimer(titreTypeTitreStatut: $element) {
      ...titreTypeTitreStatut
    }
  }

  ${fragmentTitreTypeTitreStatut}
`)

const titresTypesDemarchesTypes = apiGraphQLFetch(
  gql`
    query TitresTypesDemarchesTypes {
      titresTypesDemarchesTypes {
        ...titreTypeDemarcheType
      }
    }

    ${fragmentTitreTypeDemarcheType}
  `
)

const titreTypeDemarcheTypeModifier = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeModifier(
    $element: InputTitreTypeDemarcheType!
  ) {
    titreTypeDemarcheTypeModifier(titreTypeDemarcheType: $element) {
      ...titreTypeDemarcheType
    }
  }

  ${fragmentTitreTypeDemarcheType}
`)

const titreTypeDemarcheTypeCreer = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeCreer($element: InputTitreTypeDemarcheType!) {
    titreTypeDemarcheTypeCreer(titreTypeDemarcheType: $element) {
      ...titreTypeDemarcheType
    }
  }

  ${fragmentTitreTypeDemarcheType}
`)

const titreTypeDemarcheTypeSupprimer = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeSupprimer(
    $element: InputTitreTypeDemarcheType!
  ) {
    titreTypeDemarcheTypeSupprimer(titreTypeDemarcheType: $element) {
      ...titreTypeDemarcheType
    }
  }

  ${fragmentTitreTypeDemarcheType}
`)

const titresTypesDemarchesTypesEtapesTypes = apiGraphQLFetch(
  gql`
    query TitresTypesDemarchesTypesEtapesTypes {
      titresTypesDemarchesTypesEtapesTypes {
        ...titreTypeDemarcheTypeEtapeType
      }
    }

    ${fragmentTitreTypeDemarcheTypeEtapeType}
  `
)

const titreTypeDemarcheTypeEtapeTypeModifier = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeEtapeTypeModifier(
    $element: InputTitreTypeDemarcheTypeEtapeType!
  ) {
    titreTypeDemarcheTypeEtapeTypeModifier(
      titreTypeDemarcheTypeEtapeType: $element
    ) {
      ...titreTypeDemarcheTypeEtapeType
    }
  }

  ${fragmentTitreTypeDemarcheTypeEtapeType}
`)

const titreTypeDemarcheTypeEtapeTypeCreer = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeEtapeTypeCreer(
    $element: InputTitreTypeDemarcheTypeEtapeType!
  ) {
    titreTypeDemarcheTypeEtapeTypeCreer(
      titreTypeDemarcheTypeEtapeType: $element
    ) {
      ...titreTypeDemarcheTypeEtapeType
    }
  }

  ${fragmentTitreTypeDemarcheTypeEtapeType}
`)

const titreTypeDemarcheTypeEtapeTypeSupprimer = apiGraphQLFetch(gql`
  mutation TitreTypeDemarcheTypeEtapeTypeSupprimer(
    $element: InputTitreTypeDemarcheTypeEtapeType!
  ) {
    titreTypeDemarcheTypeEtapeTypeSupprimer(
      titreTypeDemarcheTypeEtapeType: $element
    ) {
      ...titreTypeDemarcheTypeEtapeType
    }
  }

  ${fragmentTitreTypeDemarcheTypeEtapeType}
`)

const etapesTypesEtapesStatuts = apiGraphQLFetch(
  gql`
    query EtapesTypesEtapesStatuts {
      etapesTypesEtapesStatuts {
        ...etapeTypeEtapeStatut
      }
    }

    ${fragmentEtapeTypeEtapeStatut}
  `
)

const etapeTypeEtapeStatutModifier = apiGraphQLFetch(gql`
  mutation EtapeTypeEtapeStatutModifier($element: InputEtapeTypeEtapeStatut!) {
    etapeTypeEtapeStatutModifier(etapeTypeEtapeStatut: $element) {
      ...etapeTypeEtapeStatut
    }
  }

  ${fragmentEtapeTypeEtapeStatut}
`)

const etapeTypeEtapeStatutCreer = apiGraphQLFetch(gql`
  mutation EtapeTypeEtapeStatutCreer($element: InputEtapeTypeEtapeStatut!) {
    etapeTypeEtapeStatutCreer(etapeTypeEtapeStatut: $element) {
      ...etapeTypeEtapeStatut
    }
  }

  ${fragmentEtapeTypeEtapeStatut}
`)

const etapeTypeEtapeStatutSupprimer = apiGraphQLFetch(gql`
  mutation EtapeTypeEtapeStatutSupprimer($element: InputEtapeTypeEtapeStatut!) {
    etapeTypeEtapeStatutSupprimer(etapeTypeEtapeStatut: $element) {
      ...etapeTypeEtapeStatut
    }
  }

  ${fragmentEtapeTypeEtapeStatut}
`)

const etapesTypesDocumentsTypes = apiGraphQLFetch(
  gql`
    query EtapesTypesDocumentsTypes {
      etapesTypesDocumentsTypes {
        ...etapeTypeDocumentType
      }
    }

    ${fragmentEtapeTypeDocumentType}
  `
)

const etapeTypeDocumentTypeModifier = apiGraphQLFetch(gql`
  mutation EtapeTypeDocumentTypeModifier(
    $element: InputEtapeTypeDocumentType!
  ) {
    etapeTypeDocumentTypeModifier(etapeTypeDocumentType: $element) {
      ...etapeTypeDocumentType
    }
  }

  ${fragmentEtapeTypeDocumentType}
`)

const etapeTypeDocumentTypeCreer = apiGraphQLFetch(gql`
  mutation EtapeTypeDocumentTypeCreer($element: InputEtapeTypeDocumentType!) {
    etapeTypeDocumentTypeCreer(etapeTypeDocumentType: $element) {
      ...etapeTypeDocumentType
    }
  }

  ${fragmentEtapeTypeDocumentType}
`)

const etapeTypeDocumentTypeSupprimer = apiGraphQLFetch(gql`
  mutation EtapeTypeDocumentTypeSupprimer(
    $element: InputEtapeTypeDocumentType!
  ) {
    etapeTypeDocumentTypeSupprimer(etapeTypeDocumentType: $element) {
      ...etapeTypeDocumentType
    }
  }

  ${fragmentEtapeTypeDocumentType}
`)

const etapesTypesJustificatifsTypes = apiGraphQLFetch(
  gql`
    query EtapesTypesJustificatifsTypes {
      etapesTypesJustificatifsTypes {
        ...etapeTypeJustificatifType
      }
    }

    ${fragmentEtapeTypeJustificatifType}
  `
)

const etapeTypeJustificatifTypeModifier = apiGraphQLFetch(gql`
  mutation EtapeTypeJustificatifTypeModifier(
    $element: InputEtapeTypeJustificatifType!
  ) {
    etapeTypeJustificatifTypeModifier(etapeTypeJustificatifType: $element) {
      ...etapeTypeJustificatifType
    }
  }

  ${fragmentEtapeTypeJustificatifType}
`)

const etapeTypeJustificatifTypeCreer = apiGraphQLFetch(gql`
  mutation EtapeTypeJustificatifTypeCreer(
    $element: InputEtapeTypeJustificatifType!
  ) {
    etapeTypeJustificatifTypeCreer(etapeTypeJustificatifType: $element) {
      ...etapeTypeJustificatifType
    }
  }

  ${fragmentEtapeTypeJustificatifType}
`)

const etapeTypeJustificatifTypeSupprimer = apiGraphQLFetch(gql`
  mutation EtapeTypeJustificatifTypeSupprimer(
    $element: InputEtapeTypeJustificatifType!
  ) {
    etapeTypeJustificatifTypeSupprimer(etapeTypeJustificatifType: $element) {
      ...etapeTypeJustificatifType
    }
  }

  ${fragmentEtapeTypeJustificatifType}
`)

export {
  definitions,
  definitionModifier,
  domaines,
  domaineModifier,
  titresTypesTypes,
  titreTypeTypeModifier,
  titresStatuts,
  titreStatutModifier,
  demarchesTypes,
  demarcheTypeModifier,
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
  geoSystemeModifier,
  titresTypes,
  titreTypeModifier,
  titreTypeCreer,
  titreTypeSupprimer,
  titresTypesTitresStatuts,
  titreTypeTitreStatutModifier,
  titreTypeTitreStatutCreer,
  titreTypeTitreStatutSupprimer,
  titresTypesDemarchesTypes,
  titreTypeDemarcheTypeModifier,
  titreTypeDemarcheTypeCreer,
  titreTypeDemarcheTypeSupprimer,
  titresTypesDemarchesTypesEtapesTypes,
  titreTypeDemarcheTypeEtapeTypeModifier,
  titreTypeDemarcheTypeEtapeTypeCreer,
  titreTypeDemarcheTypeEtapeTypeSupprimer,
  etapesTypesEtapesStatuts,
  etapeTypeEtapeStatutModifier,
  etapeTypeEtapeStatutCreer,
  etapeTypeEtapeStatutSupprimer,
  etapesTypesDocumentsTypes,
  etapeTypeDocumentTypeModifier,
  etapeTypeDocumentTypeCreer,
  etapeTypeDocumentTypeSupprimer,
  etapesTypesJustificatifsTypes,
  etapeTypeJustificatifTypeModifier,
  etapeTypeJustificatifTypeCreer,
  etapeTypeJustificatifTypeSupprimer
}
