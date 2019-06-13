import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import { queryEntreprise, queryEntreprises } from './queries/entreprises'

const entreprise = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryEntreprise,
      variables: { id },
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.entreprise
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const entreprises = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryEntreprises,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.entreprises
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export { entreprise, entreprises }
