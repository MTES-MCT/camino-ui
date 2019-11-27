import gql from 'graphql-tag'
import { fragmentTitreEntreprises } from './entreprises'
import { fragmentTitreSubstance } from './substance'
import { fragmentPoint } from './point'
import { fragmentPays } from './pays'
import { fragmentUnite } from './metas'

const fragmentTitreEtape = gql`
  fragment etape on Etape {
    id
    ordre
    date
    dateDebut
    dateFin
    duree
    surface
    volume
    volumeUnite {
      ...unite
    }
    engagement
    engagementDevise {
      id
      nom
    }
    type {
      id
      nom
    }
    statut {
      id
      nom
      couleur
    }
    administrations {
      ...titreAdministrations
    }
    titulaires {
      ...titreEntreprises
    }
    amodiataires {
      ...titreEntreprises
    }
    points {
      ...point
    }
    substances {
      ...titreSubstance
    }
    documents {
      ...document
    }
    incertitudes {
      ...incertitudes
    }
    pays {
      ...pays
    }
    contenu

    editable
    supprimable
  }

  ${fragmentTitreEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  fragment document on Document {
    id
    nom
    type {
      id
      nom
    }
    fichier
    fichierTypeId
    url
    uri
    jorf
    nor
  }

  fragment incertitudes on Incertitudes {
    date
    dateDebut
    dateFin
    duree
    surface
    volume
    engagement
    points
    substances
    titulaires
    amodiataires
    administrations
  }
`

export { fragmentTitreEtape }
