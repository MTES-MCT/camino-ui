import gql from 'graphql-tag'
import fragmentSubstance from './fragments/substance'
import fragmentEntreprises from './fragments/entreprises'
import fragmentPermission from './fragments/permission'
import { fragmentMeta } from './fragments/metas'

const queryInit = gql`
  query Init {
    version

    substances {
      ...substance
    }

    entreprises {
      ...entreprises
    }

    permissions {
      ...permission
    }

    metas {
      ...meta
    }
  }

  ${fragmentEntreprises}

  ${fragmentSubstance}

  ${fragmentPermission}

  ${fragmentMeta}
`

export { queryInit }
