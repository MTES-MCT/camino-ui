import gql from 'graphql-tag'
import { fragmentUnite } from './metas'

const fragmentPointReference = gql`
  fragment pointReference on PointReference {
    id
    geoSysteme {
      id
      nom
      zone
      unite {
        ...unite
      }
    }
    coordonnees {
      x
      y
    }
    opposable
  }

  ${fragmentUnite}
`

const fragmentPoint = gql`
  fragment point on Point {
    id
    coordonnees {
      x
      y
    }
    groupe
    contour
    point
    nom
    description
    securite
    subsidiaire
    lot
    references {
      ...pointReference
    }
  }

  ${fragmentPointReference}
`

export { fragmentPoint, fragmentPointReference }
