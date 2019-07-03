import gql from 'graphql-tag'
import fragmentEntreprises from './entreprises'
import fragmentAdministration from './administration'
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
      ...administration
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

  ${fragmentAdministration}

  ${fragmentEntreprises}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}
`

export default fragmentTitres
