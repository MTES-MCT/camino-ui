import gql from 'graphql-tag'

import { fragmentTitreDemarche } from './demarche'
import { fragmentTitreActivite } from './activite'
import { fragmentTitreSubstance, fragmentTitresSubstance } from './substance'
import {
  fragmentTitreAdministrations,
  fragmentTitresAdministrations
} from './administrations'
import {
  fragmentTitreEntreprises,
  fragmentTitresEntreprises
} from './entreprises'

import { fragmentPoint } from './point'
import { fragmentPays } from './pays'

import { fragmentGeojsonPoints, fragmentGeojsonMultiPolygon } from './geojson'

const fragmentTitre = gql`
  fragment titre on Titre {
    id
    nom
    type {
      id
      type {
        nom
      }
      sections
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
      type {
        id
        nom
      }
      nom
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
    contenu

    editable
    supprimable
    doublonTitreId
  }

  ${fragmentTitreAdministrations}

  ${fragmentTitreEntreprises}

  ${fragmentTitreDemarche}

  ${fragmentTitreActivite}

  ${fragmentTitreSubstance}

  ${fragmentPoint}

  ${fragmentGeojsonPoints}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentPays}
`

const fragmentTitres = gql`
  fragment titres on Titre {
    id
    nom
    type {
      id
      type {
        nom
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
      type {
        id
        nom
      }
      nom
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
    surface
    pays {
      nom
      regions {
        nom
        departements {
          nom
          communes {
            nom
            surface
          }
        }
      }
    }
  }

  ${fragmentTitresAdministrations}

  ${fragmentTitresEntreprises}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}
`

const fragmentDemarchesTitre = gql`
  fragment demarchesTitre on Titre {
    id
    nom
    type {
      id
      type {
        nom
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
  }
`

export { fragmentTitre, fragmentTitres, fragmentDemarchesTitre }
