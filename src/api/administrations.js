import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import {
  queryAdministration,
  queryAdministrations
} from './queries/administrations'

const administration = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryAdministration,
      variables: { id },
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.administration
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const administrations = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryAdministrations,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.administrations
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

export { administration, administrations }
