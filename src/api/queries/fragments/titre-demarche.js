import gql from 'graphql-tag'

import fragmentTitreEtape from './titre-etape'
import { fragmentDemarcheType } from './metas'

const fragmentTitreDemarche = gql`
  fragment titreDemarche on Demarche {
    id
    ordre
    type {
      ...demarcheType
    }
    statut {
      id
      nom
      couleur
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
  }

  ${fragmentTitreEtape}
  ${fragmentDemarcheType}
`

const fragmentTitresDemarche = gql`
  fragment titresDemarche on Demarche {
    id
    ordre
    phase {
      dateDebut
      dateFin
      statut {
        id
        nom
        couleur
      }
    }
  }
`

export { fragmentTitreDemarche, fragmentTitresDemarche }
