import gql from 'graphql-tag'
import {fragmentUnite} from './metas'

const fragmentPointReference = gql`
  fragment pointReference on PointReference {
    id
    geoSysteme {
      id
      nom
      zone
      uniteType
    }
    coordonnees {
      x
      y
    }
    unite {
      ...unite
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
    references {
      ...pointReference
    }
  }

  ${fragmentPointReference}
`

export { fragmentPoint, fragmentPointReference }
