import gql from 'graphql-tag'

import fragmentTitreEtape from './titre-etape'

const fragmentDemarche = gql`
  fragment demarche on Demarche {
    id
    ordre
    type {
      id
      nom
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
`

export default fragmentDemarche
