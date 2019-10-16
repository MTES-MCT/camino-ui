import gql from 'graphql-tag'
import fragmentSubstance from './fragments/substance'
import fragmentEntreprises from './fragments/entreprises'
import fragmentAdministrations from './fragments/administrations'
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

    administrations {
      ...administrations
    }

    permissions {
      ...permission
    }

    metas {
      ...meta
    }
  }

  ${fragmentEntreprises}

  ${fragmentAdministrations}

  ${fragmentSubstance}

  ${fragmentPermission}

  ${fragmentMeta}
`

export { queryInit }
