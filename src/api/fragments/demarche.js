import gql from 'graphql-tag'

import { fragmentTitreEtape } from './etape'
import { fragmentDemarcheType, fragmentDemarcheStatut } from './metas'

const fragmentTitreDemarche = gql`
  fragment titreDemarche on Demarche {
    id
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
      ...etape
    }

    editable
    supprimable
  }

  ${fragmentTitreEtape}
  ${fragmentDemarcheType}
  ${fragmentDemarcheStatut}
`

export { fragmentTitreDemarche }
