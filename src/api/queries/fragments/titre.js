import gql from 'graphql-tag'

import { fragmentDemarcheType } from './metas'
import { fragmentTitreDemarche } from './titre-demarche'
import { fragmentTitreActivite } from './titre-activite'
import { fragmentTitreSubstance } from './titre-substance'
import fragmentEntreprises from './entreprises'
import { fragmentPoint } from './point'
import fragmentPays from './pays'

import { fragmentGeojsonPoints, fragmentGeojsonMultiPolygon } from './geojson'

const fragmentTitre = gql`
  fragment titre on Titre {
    id
    nom
    type {
      id
      nom
      demarchesTypes {
        ...demarcheType
      }
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
      nom
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
    geojsonPoints {
      ...geojsonPoints
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
    pays {
      ...pays
    }
    demarches {
      ...titreDemarche
    }
    activites {
      ...titreActivite
    }
  }

  ${fragmentEntreprises}

  ${fragmentDemarcheType}

  ${fragmentTitreDemarche}

  ${fragmentTitreActivite}

  ${fragmentTitreSubstance}

  ${fragmentPoint}

  ${fragmentGeojsonPoints}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentPays}
`

export default fragmentTitre
