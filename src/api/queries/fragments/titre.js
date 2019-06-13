import gql from 'graphql-tag'

import { fragmentDemarcheType } from './metas'
import { fragmentTitreDemarche } from './titre-demarche'
import { fragmentTitreActivite } from './titre-activite'
import { fragmentTitreSubstance } from './titre-substance'
import { fragmentEntrepriseList } from './entreprise'
import fragmentPoint from './point'

import { fragmentGeojsonPoints } from './geojson'

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
      ...entrepriseList
    }
    amodiataires {
      ...entrepriseList
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
      ...titreActivite
    }
  }

  ${fragmentEntrepriseList}

  ${fragmentDemarcheType}

  ${fragmentTitreDemarche}

  ${fragmentTitreActivite}

  ${fragmentTitreSubstance}

  ${fragmentPoint}

  ${fragmentGeojsonPoints}
`

export default fragmentTitre
