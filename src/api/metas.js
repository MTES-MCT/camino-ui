import graphqlClient from './_graphql-client'
import graphqlErrorThrow from './_error-throw'
import {
  queryMetasInit,
  queryMetasUtilisateur,
  queryMetasTitre,
  queryMetasTitreEtape,
  queryMetasTitres,
  queryMetasDocument
} from './queries/metas'

const metasInit = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasInit,
      variables: {}
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
      variables: {},
      fetchPolicy: 'network-only'
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasTitreEtape = async ({ titreDemarcheId, typeId: etapeTypeId }) => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasTitreEtape,
      variables: {
        titreDemarcheId,
        etapeTypeId
      }
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

const metasTitreEtapeDocument = async () => {
  try {
    const res = await graphqlClient.query({
      query: queryMetasDocument,
      variables: {}
    })

    return res && res.data
  } catch (e) {
    console.error(e)
    graphqlErrorThrow(e)
  }
}

export {
  metasInit,
  metasUtilisateur,
  metasTitre,
  metasTitres,
  metasTitreEtape,
  metasTitreEtapeDocument
}
