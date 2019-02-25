import gql from 'graphql-tag'

const fragmentGeojsonMultiPolygon = gql`
  fragment geojsonMultiPolygon on GeojsonMultiPolygon {
    type
    geometry {
      type
      coordinates
    }
  }
`

const fragmentGeojsonPoints = gql`
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

export { fragmentGeojsonPoints, fragmentGeojsonMultiPolygon }
