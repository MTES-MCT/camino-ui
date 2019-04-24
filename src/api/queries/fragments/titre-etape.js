import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import { fragmentTitreSubstance } from './titre-substance'
import fragmentPoint from './point'

const fragmentTitreEtape = gql`
  fragment etape on Etape {
    id
    ordre
    date
    dateDebut
    dateFin
    duree
    surface
    volume
    volumeUnite {
      id
      nom
    }
    visas
    engagement
    engagementDevise {
      id
      nom
    }
    sourceIndisponible
    type {
      id
      nom
    }
    statut {
      id
      nom
      couleur
    }
    emprises {
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
    substances {
      ...titreSubstance
    }
    documents {
      ...document
    }
  }

  ${fragmentAdministration}

  ${fragmentEntreprise}

  ${fragmentPoint}

  ${fragmentTitreSubstance}

  fragment document on Document {
    id
    nom
    type
    url
    uri
    fichier
    jorf
    nor
  }
`

export default fragmentTitreEtape
