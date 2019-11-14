import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'

import {
  queryEntreprise,
  queryEntreprises,
  mutationEntrepriseCreer,
  mutationEntrepriseModifier
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
    console.error(e)
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
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const entrepriseCreate = async ({ entreprise }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationEntrepriseCreer,
      variables: { entreprise }
    })

    return res && res.data && res.data.entrepriseCreer
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const entrepriseUpdate = async ({ entreprise }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationEntrepriseModifier,
      variables: { entreprise }
    })

    return res && res.data && res.data.entrepriseModifier
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

export { entreprise, entreprises, entrepriseCreate, entrepriseUpdate }
