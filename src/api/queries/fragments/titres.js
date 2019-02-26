import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import { fragmentTitreListSubstance } from './titre-substance'
import { fragmentGeojsonMultiPolygon } from './geojson'
import { fragmentTitreListDemarche } from './titre-demarche'

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
      ...titreListSubstance
    }
    surface
    volume
    volumeUnite {
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
      ...titreListDemarche
    }
  }

  ${fragmentAdministration}

  ${fragmentEntreprise}

  ${fragmentTitreListSubstance}

  ${fragmentTitreListDemarche}

  ${fragmentGeojsonMultiPolygon}
`

export default fragmentTitreList
