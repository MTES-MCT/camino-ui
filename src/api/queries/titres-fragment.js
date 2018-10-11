import gql from 'graphql-tag'
import entrepriseFragment from './entreprise-fragment'
import administrationFragment from './administration-fragment'
import utilisateurFragment from './utilisateur-fragment'

const titreFragment = gql`
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
  }

  ${administrationFragment}

  ${entrepriseFragment}

  ${utilisateurFragment}

  fragment point on Point {
    id
    coordonees {
      x
      y
    }
    groupe
    contour
    point
    nom
    description
    securite
    references {
      ...pointReference
    }
  }

  fragment pointReference on PointReference {
    id
    systeme
    coordonees {
      x
      y
    }
  }

  fragment geojsonMultiPolygon on GeojsonMultiPolygon {
    type
    geometry {
      type
      coordinates
    }
  }

  fragment geojsonPoints on GeojsonPoints {
    type
    features {
      type
      geometry {
        type
        coordinates
      }
    }
  }

  fragment substance on TitreSubstance {
    id
    nom
    connexe
    gerep
    description
    legales {
      id
      nom
      description
      domaine {
        id
        nom
      }
      code {
        id
        nom
        description
        lien
      }
    }
  }
`

export default titreFragment
