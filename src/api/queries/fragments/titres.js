import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import { fragmentTitresSubstance } from './titre-substance'
import { fragmentGeojsonMultiPolygon } from './geojson'
import { fragmentTitresActivite } from './titre-activite'

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
      ...entreprise
    }
    amodiataires {
      ...entreprise
    }
    geojsonMultiPolygon {
      ...geojsonMultiPolygon
    }
    activites {
      ...titresActivite
    }
  }

  ${fragmentAdministration}

  ${fragmentEntreprise}

  ${fragmentTitresSubstance}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentTitresActivite}
`

export default fragmentTitreList
