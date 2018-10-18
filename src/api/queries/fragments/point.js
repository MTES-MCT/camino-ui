import gql from 'graphql-tag'

const fragmentPoint = gql`
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
`

export default fragmentPoint
