import gql from 'graphql-tag'
import fragmentEntreprise from './entreprise'
import fragmentAdministration from './administration'
import fragmentTitreSubstance from './titre-substance'
import fragmentPoint from './point'

const fragmentTitreSimple = gql`
  fragment titreSimple on Titre {
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
      ...titreSubstance
    }
    surface
    volume
    volumeUnite {
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
  }

  ${fragmentAdministration}

  ${fragmentEntreprise}

  ${fragmentPoint}

  ${fragmentTitreSubstance}
`

export default fragmentTitreSimple
