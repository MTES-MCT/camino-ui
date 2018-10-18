import gql from 'graphql-tag'
import fragmentSubstance from './fragments/substance'
import fragmentEntreprise from './fragments/entreprise'
import fragmentPermission from './fragments/permission'

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
  }

  ${fragmentEntreprise}

  ${fragmentSubstance}

  ${fragmentPermission}
`

export { queryInit }
