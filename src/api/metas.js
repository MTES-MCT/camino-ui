import gql from 'graphql-tag'

import {
  fragmentEtapeType,
  fragmentDemarcheType,
  fragmentUnite,
  fragmentPermission,
  fragmentActiviteType
} from './fragments/metas'
import { fragmentSubstance } from './fragments/substance'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administrations'

import { apiQuery } from './_utils'

const metasInit = apiQuery(
  gql`
    query Init {
      version

      utilisateurDomaines {
        id
        nom
        titresTypes {
          id
          type {
            nom
          }
        }
      }
    }
  `,
  { fetchPolicy: 'network-only' }
)

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
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasDemarches = apiQuery(
  gql`
    query MetasDemarches {
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

      demarchesTypes {
        id
        nom
      }

      demarchesStatuts {
        id
        nom
        couleur
      }

      etapesTypes {
        id
        nom
        etapesStatuts {
          id
          nom
          couleur
        }
      }
    }
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasActivites = apiQuery(
  gql`
    query MetasActivites {
      activitesTypes {
        ...activiteType
      }
    }

    ${fragmentActiviteType}
  `,
  {
    fetchPolicy: 'network-only'
  }
)

const metasTitreDemarche = apiQuery(
  gql`
    query MetasDemarche($titreId: ID!, $typeId: ID) {
      titreDemarchesTypes(titreId: $titreId, demarcheTypeId: $typeId) {
        ...demarcheType
      }
    }

    ${fragmentDemarcheType}
  `,
  { fetchPolicy: 'network-only' }
)

const metasTitreEtape = apiQuery(
  gql`
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

      entreprises {
        ...entreprises
      }
    }

    ${fragmentEtapeType}

    ${fragmentUnite}

    ${fragmentSubstance}

    ${fragmentEntreprises}
  `,
  { fetchPolicy: 'network-only' }
)

const metasUtilisateur = apiQuery(
  gql`
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
  `,
  { fetchPolicy: 'network-only' }
)

const metasDocument = apiQuery(
  gql`
    query MetasDocument {
      documentsTypes {
        id
        nom
      }
    }
  `,
  { fetchPolicy: 'network-only' }
)

export {
  metasDocument,
  metasTitreEtape,
  metasTitreDemarche,
  metasInit,
  metasUtilisateur,
  metasTitre,
  metasTitres,
  metasActivites,
  metasDemarches
}
