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
  fragmentTravauxType
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
  substancesLegales
}
