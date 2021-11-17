import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import { fragmentPoint } from './fragments/point'

const pointsImporter = apiGraphQLFetch(gql`
  query PointsImporter($file: FileUpload!, $geoSystemeId: String!) {
    pointsImporter(fileUpload: $file, geoSystemeId: $geoSystemeId) {
      points {
        ...point
      }
      surface
    }
  }

  ${fragmentPoint}
`)

const surfaceCalculer = apiGraphQLFetch(gql`
  query SurfaceCalculer($points: [InputPoint]!) {
    surfaceCalculer(points: $points) {
      surface
    }
  }
`)

export { pointsImporter, surfaceCalculer }
