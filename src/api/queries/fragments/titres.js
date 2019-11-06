import gql from 'graphql-tag'
import { fragmentTitresEntreprises } from './titre-entreprise'
import { fragmentTitresAdministrations } from './titre-administration'
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
    administrations {
      ...titresAdministrations
    }
    titulaires {
      ...titresEntreprises
    }
    amodiataires {
      ...titresEntreprises
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
  }

  ${fragmentTitresAdministrations}

  ${fragmentTitresEntreprises}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}
`

export default fragmentTitres
