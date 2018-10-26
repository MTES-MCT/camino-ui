import graphqlClient from './_graphql-client'
import errorLog from '@/api/_error-log'
import { queryInit } from './queries/init'

const init = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryInit,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data
  } catch (e) {
    errorLog(e, 'init')
  }
}

export { init }
