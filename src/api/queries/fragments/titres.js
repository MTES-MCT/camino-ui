import gql from 'graphql-tag'
import { fragmentEntrepriseList } from './entreprise'
import fragmentAdministration from './administration'
import { fragmentTitresSubstance } from './titre-substance'
import { fragmentGeojsonMultiPolygon } from './geojson'

const fragmentTitreList = gql`
  fragment titreList on Titre {
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
      ...entrepriseList
    }
    amodiataires {
      ...entrepriseList
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
  }

  ${fragmentAdministration}

  ${fragmentEntrepriseList}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}
`

export default fragmentTitreList
