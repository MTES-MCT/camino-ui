import gql from 'graphql-tag'
import fragmentEntreprises from './entreprises'
import fragmentAdministrations from './administrations'
import { fragmentTitresSubstance } from './titre-substance'
import { fragmentGeojsonMultiPolygon } from './geojson'

const fragmentTitres = gql`
  fragment titres on Titre {
    id
    nom
    type {
      id
      nom
    }
    domaine {
      id
      nom
    }
    statut {
      id
      nom
      couleur
    }
    references {
      type
      valeur
    }
    substances {
      ...titresSubstance
    }
    dateDebut
    dateFin
    dateDemande
    activitesEnConstruction
    activitesAbsentes
    activitesDeposees
    surface
    volume
    volumeUnite {
      id
      nom
    }
    engagement
    engagementDevise {
      id
    }
    administrations {
      ...administrations
    }
    titulaires {
      ...entreprises
    }
    amodiataires {
      ...entreprises
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
  }

  ${fragmentAdministrations}

  ${fragmentEntreprises}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}
`

export default fragmentTitres
