import gql from 'graphql-tag'

import { fragmentTitreEtape } from './titre-etape'
import { fragmentDemarcheType, fragmentDemarcheStatut } from './metas'

const fragmentTitreDemarche = gql`
  fragment titreDemarche on Demarche {
    id
    slug
    ordre
    type {
      ...demarcheType
    }
    statut {
      ...demarcheStatut
    }
    phase {
      dateDebut
      dateFin
      statut {
        id
        nom
        couleur
      }
    }
    etapes {
      ...titreEtape
    }

    modification
    etapesCreation
    suppression
  }

  ${fragmentTitreEtape}
  ${fragmentDemarcheType}
  ${fragmentDemarcheStatut}
`

export { fragmentTitreDemarche }
