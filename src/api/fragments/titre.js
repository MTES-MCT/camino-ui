import gql from 'graphql-tag'

import { fragmentTitreType } from './metas'
import { fragmentTitreDemarche } from './titre-demarche'
import { fragmentTitreActivite } from './titre-activite'
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
      ...titreType
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

    modification
    suppression
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

  ${fragmentTitreType}
`

const fragmentTitres = gql`
  fragment titres on Titre {
    id
    nom
    type {
      ...titreType
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

  ${fragmentTitreType}
`

const fragmentDemarchesTitre = gql`
  fragment demarchesTitre on Titre {
    id
    nom
    type {
      ...titreType
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

  ${fragmentTitreType}
`

export { fragmentTitre, fragmentTitres, fragmentDemarchesTitre }
