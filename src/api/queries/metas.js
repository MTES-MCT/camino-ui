import gql from 'graphql-tag'

import {
  fragmentEtapeType,
  fragmentUnite,
  fragmentPermission
} from './fragments/metas'
import fragmentSubstance from './fragments/substance'
import fragmentEntreprises from './fragments/entreprises'
import fragmentAdministrations from './fragments/administrations'

const queryMetasInit = gql`
  query Init {
    version
  }
`

const queryMetasTitre = gql`
  query MetasTitre {
    domaines {
      id
      nom
      types {
        id
        nom

        domaineId

        editable
      }

      editable
    }

    referencesTypes {
      id
      nom
    }
  }
`
const queryMetasTitres = gql`
  query MetasTitres {
    domaines {
      id
      nom

      editable
    }

    types {
      id
      nom

      editable
    }

    statuts {
      id
      nom
      couleur
    }
  }
`

const queryMetasTitreEtape = gql`
  query MetasEtape($titreDemarcheId: ID!, $etapeTypeId: ID) {
    etapesTypesEtapeEdition(
      titreDemarcheId: $titreDemarcheId
      etapeTypeId: $etapeTypeId
    ) {
      ...etapeType
    }

    devises {
      id
      nom
    }

    unites {
      ...unite
    }

    geoSystemes {
      id
      nom
      zone
      unite {
        ...unite
      }
    }

    substances {
      ...substance
    }

    entreprises {
      ...entreprises
    }

    administrations {
      ...administrations
    }
  }

  ${fragmentEtapeType}

  ${fragmentUnite}

  ${fragmentEntreprises}

  ${fragmentAdministrations}

  ${fragmentSubstance}
`

const queryMetasUtilisateur = gql`
  query MetasUtilisateur {
    permissions {
      ...permission
    }

    entreprises {
      ...entreprises
    }

    administrations {
      ...administrations
    }
  }

  ${fragmentPermission}

  ${fragmentEntreprises}

  ${fragmentAdministrations}
`

const queryMetasDocument = gql`
  query MetasDocument {
    documentsTypes {
      id
      nom
    }
  }
`

export {
  queryMetasDocument,
  queryMetasTitreEtape,
  queryMetasInit,
  queryMetasUtilisateur,
  queryMetasTitre,
  queryMetasTitres
}
