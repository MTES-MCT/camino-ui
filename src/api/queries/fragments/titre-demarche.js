import gql from 'graphql-tag'

import fragmentTitreEtape from './titre-etape'

const fragmentTitreDemarche = gql`
  fragment titreDemarche on Demarche {
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

const fragmentTitreListDemarche = gql`
  fragment titreListDemarche on Demarche {
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

export { fragmentTitreDemarche, fragmentTitreListDemarche }
