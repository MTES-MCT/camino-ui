import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import { queryStatistiques } from './queries/statistiques'

const statistiques = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryStatistiques,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data.statistiques
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { statistiques }
