import gql from 'graphql-tag'
import fragmentSubstance from './fragments/substance'
import fragmentEntreprise from './fragments/entreprise'
import fragmentPermission from './fragments/permission'
import fragmentMeta from './fragments/meta'

const queryInit = gql`
  query Init {
    substances {
      ...substance
    }

    entreprises {
      ...entreprise
    }

    permissions {
      ...permission
    }

    metas {
      ...meta
    }
  }

  ${fragmentEntreprise}

  ${fragmentSubstance}

  ${fragmentPermission}

  ${fragmentMeta}
`

export { queryInit }
