import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import {
  queryEntreprise,
  queryEntreprises,
  queryEntrepriseParSirenDatabase,
  queryEntrepriseParSirenApi,
  mutationEntrepriseCreer
} from './queries/entreprises'

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

const entrepriseSearchDatabase = async siren => {
  try {
    const res = await graphqlClient.query({
      query: queryEntrepriseParSirenDatabase,
      variables: { siren },
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.entrepriseParSirenDatabase
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const entrepriseAskApi = async siren => {
  try {
    const res = await graphqlClient.query({
      query: queryEntrepriseParSirenApi,
      variables: { siren },
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.entrepriseParSirenApi
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const entrepriseAdd = async ({ entreprise }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationEntrepriseCreer,
      variables: { entreprise }
    })

    return res && res.data && res.data.entrepriseCreer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export {
  entreprise,
  entreprises,
  entrepriseSearchDatabase,
  entrepriseAskApi,
  entrepriseAdd
}
