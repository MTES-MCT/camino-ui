import gql from 'graphql-tag'

import { fragmentDemarchesTitre } from './titre'
import { fragmentTitreEtape } from './etape'
import { fragmentDemarcheType, fragmentDemarcheStatut } from './metas'

const fragmentDemarches = gql`
  fragment demarches on Demarche {
    id
    ordre
    titre {
      ...demarchesTitre
    }
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
  ${fragmentDemarchesTitre}
`

export { fragmentDemarches }
