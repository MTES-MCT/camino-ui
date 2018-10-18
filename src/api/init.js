import graphqlClient from './_graphql-client'
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
    console.log({ e })
  }
}

export { init }
