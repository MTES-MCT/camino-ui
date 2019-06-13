import gql from 'graphql-tag'
import fragmentSubstance from './fragments/substance'
import { fragmentEntrepriseList } from './fragments/entreprise'
import fragmentPermission from './fragments/permission'
import { fragmentMeta } from './fragments/metas'

const queryInit = gql`
  query Init {
    version

    substances {
      ...substance
    }

    entreprises {
      ...entrepriseList
    }

    permissions {
      ...permission
    }

    metas {
      ...meta
    }
  }

  ${fragmentEntrepriseList}

  ${fragmentSubstance}

  ${fragmentPermission}

  ${fragmentMeta}
`

export { queryInit }
