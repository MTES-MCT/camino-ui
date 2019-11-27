import gql from 'graphql-tag'

import {
  fragmentEtapeType,
  fragmentDemarcheType,
  fragmentUnite,
  fragmentPermission
} from './fragments/metas'
import { fragmentSubstance } from './fragments/substance'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administration'

import { apiQuery } from './_utils'

const metasInit = apiQuery(gql`
  query Init {
    version

    entreprises {
      ...entreprises
    }
  }

  ${fragmentEntreprises}
`)

const metasTitre = apiQuery(
  gql`
    query MetasTitre {
      referencesTypes {
        id
        nom
      }
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasTitres = apiQuery(
  gql`
    query MetasTitres {
      domaines {
        id
        nom
      }

      types {
        id
        nom
      }

      statuts {
        id
        nom
        couleur
      }

      utilisateurDomaines {
        id
        nom
        types {
          id
          nom
          domaineId
        }
      }
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasTitreDemarche = apiQuery(gql`
  query MetasDemarche($titreId: ID!, $typeId: ID) {
    titreDemarchesTypes(titreId: $titreId, demarcheTypeId: $typeId) {
      ...demarcheType
    }
  }

  ${fragmentDemarcheType}
`)

const metasTitreEtape = apiQuery(gql`
  query MetasEtape($titreDemarcheId: ID!, $typeId: ID) {
    demarcheEtapesTypes(
      titreDemarcheId: $titreDemarcheId
      etapeTypeId: $typeId
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
  }

  ${fragmentEtapeType}

  ${fragmentUnite}

  ${fragmentSubstance}
`)

const metasUtilisateur = apiQuery(gql`
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
`)

const metasDocument = apiQuery(gql`
  query MetasDocument {
    documentsTypes {
      id
      nom
    }
  }
`)

export {
  metasDocument,
  metasTitreEtape,
  metasTitreDemarche,
  metasInit,
  metasUtilisateur,
  metasTitre,
  metasTitres
}
