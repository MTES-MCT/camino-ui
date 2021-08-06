import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import { fragmentPoint } from './fragments/point'

const pointsImporter = apiGraphQLFetch(gql`
  query PointsImporter($file: FileUpload!, $geoSystemeId: String!) {
    pointsImporter(fileUpload: $file, geoSystemeId: $geoSystemeId) {
      ...point
    }
  }

  ${fragmentPoint}
`)

export { pointsImporter }
