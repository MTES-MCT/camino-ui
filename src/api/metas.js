import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'
import {
  queryMetasInit,
  queryMetasUtilisateur,
  queryMetasTitre,
  queryMetasTitreEtape,
  queryMetasTitres
} from './queries/metas'

const metasInit = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasInit,
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasUtilisateur = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasUtilisateur,
      variables: {}
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasTitre = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasTitre,
      variables: {}
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasTitres = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasTitres,
      variables: {}
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasTitreEtape = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasTitreEtape,
      variables: {}
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

export { metasInit, metasUtilisateur, metasTitre, metasTitres, metasTitreEtape }
