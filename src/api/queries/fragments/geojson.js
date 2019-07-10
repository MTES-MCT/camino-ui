import gql from 'graphql-tag'

import { fragmentPointReference } from './point'
const fragmentGeojsonMultiPolygon = gql`
  fragment geojsonMultiPolygon on GeojsonMultiPolygon {
    type
    properties {
      etapeId
    }
    geometry {
      type
      coordinates
    }
  }
`

const fragmentGeojsonPoints = gql`
  fragment geojsonPoints on GeojsonPoints {
    type
    properties {
      etapeId
    }
    features {
      type
      properties {
        id
        groupe
        contour
        point
        nom
        description
        references {
          ...pointReference
        }
      }
      geometry {
        type
        coordinates
      }
    }
  }

  ${fragmentPointReference}
`

export { fragmentGeojsonPoints, fragmentGeojsonMultiPolygon }
