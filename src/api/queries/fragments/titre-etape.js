import gql from 'graphql-tag'
import fragmentEntreprises from './entreprises'
import fragmentAdministration from './administration'
import { fragmentTitreSubstance } from './titre-substance'
import { fragmentPoint } from './point'
import fragmentPays from './pays'
import {fragmentUnite} from './metas'

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
    visas
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
      ...administration
    }
    titulaires {
      ...entreprises
    }
    amodiataires {
      ...entreprises
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
  }

  ${fragmentAdministration}

  ${fragmentEntreprises}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  ${fragmentPays}

  ${fragmentUnite}

  fragment document on Document {
    id
    nom
    type
    url
    uri
    fichier
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

export default fragmentTitreEtape
