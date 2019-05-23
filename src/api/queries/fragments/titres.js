import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import { fragmentTitresSubstance } from './titre-substance'
import { fragmentGeojsonMultiPolygon } from './geojson'
import { fragmentTitresDemarche } from './titre-demarche'
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
    demarches {
      ...titresDemarche
    }
    activites {
      ...titresActivite
    }
  }

  ${fragmentAdministration}

  ${fragmentEntreprise}

  ${fragmentTitresSubstance}

  ${fragmentTitresDemarche}

  ${fragmentGeojsonMultiPolygon}

  ${fragmentTitresActivite}
`

export default fragmentTitreList
