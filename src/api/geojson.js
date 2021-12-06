import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'
import { fragmentPoint } from './fragments/point'

const pointsImporter = apiGraphQLFetch(gql`
  query PointsImporter(
    $file: FileUpload!
    $geoSystemeId: String!
    $titreTypeId: String!
    $etapeTypeId: String!
  ) {
    pointsImporter(
      fileUpload: $file
      geoSystemeId: $geoSystemeId
      titreTypeId: $titreTypeId
      etapeTypeId: $etapeTypeId
    ) {
      points {
        ...point
      }
      surface
      documentTypeIds
    }
  }

  ${fragmentPoint}
`)

const surfaceCalculer = apiGraphQLFetch(gql`
  query SurfaceCalculer(
    $points: [InputPoint]!
    $titreTypeId: String!
    $etapeTypeId: String!
  ) {
    surfaceCalculer(
      points: $points
      titreTypeId: $titreTypeId
      etapeTypeId: $etapeTypeId
    ) {
      surface
      documentTypeIds
    }
  }
`)

const titreEtapeSDOMZones = apiGraphQLFetch(gql`
  query TitreEtapeSDOMZones($titreEtapeId: String!) {
    titreEtapeSDOMZones(titreEtapeId: $titreEtapeId) {
      documentTypeIds
    }
  }
`)

export { pointsImporter, surfaceCalculer, titreEtapeSDOMZones }
