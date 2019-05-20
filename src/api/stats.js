import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import { queryStats } from './queries/stats'

const stats = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryStats,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data.stats
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { stats }
