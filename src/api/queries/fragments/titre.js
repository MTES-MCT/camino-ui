import gql from 'graphql-tag'

import { fragmentTitreDemarche } from './titre-demarche'
import { fragmentTitreActivite } from './titre-activite'
import { fragmentTitreSubstance } from './titre-substance'
import fragmentPoint from './point'

import { fragmentGeojsonPoints } from './geojson'

const fragmentTitre = gql`
  fragment titre on Titre {
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
      ...titreSubstance
    }
    surface
    volume
    volumeUnite {
      id
      nom
    }
    engagement
    engagementDevise {
      id
      nom
    }
    administrations {
      ...administration
    }
    titulaires {
      ...entreprise
    }
    amodiataires {
      ...entreprise
    }
    points {
      ...point
    }
    geojsonPoints {
      ...geojsonPoints
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
    pays {
      id
      nom
      regions {
        id
        nom
        departements {
          id
          nom
          communes {
            id
            nom
          }
        }
      }
    }
    demarches {
      ...titreDemarche
    }
    activites {
      ...activite
    }
  }

  ${fragmentTitreDemarche}

  ${fragmentTitreActivite}

  ${fragmentTitreSubstance}

  ${fragmentPoint}

  ${fragmentGeojsonPoints}
`

export default fragmentTitre
