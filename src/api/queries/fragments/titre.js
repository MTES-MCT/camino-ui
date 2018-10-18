import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import fragmentTitreSubstance from './titre-substance'
import fragmentPoint from './point'

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
      ...substance
    }
    surface
    volume
    volumeUnite
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
    demarches {
      ...demarche
    }
  }

  fragment demarche on Demarche {
    id
    ordre
    type {
      id
      nom
    }
    statut {
      id
      nom
      couleur
    }
    phase {
      dateDebut
      dateFin
      statut {
        id
        nom
        couleur
      }
    }
    etapes {
      ...etape
    }
  }

  fragment etape on Etape {
    id
    ordre
    date
    duree
    surface
    volume
    volumeUnite
    visas
    engagement
    engagementDevise
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
    emprise {
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
      ...substance
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

export default fragmentTitre
