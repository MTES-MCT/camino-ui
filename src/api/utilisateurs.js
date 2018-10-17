import graphqlClient from '@/api/_graphql-client'
import {
  queryUtilisateur,
  queryUtilisateurs,
  queryUtilisateurIdentifier,
  mutationUtilisateurConnecter,
  mutationUtilisateurModifier,
  mutationUtilisateurAjouter,
  mutationUtilisateurSupprimer
} from '@/api/queries/utilisateurs'
// import { removeTypename } from './_utils'

const utilisateur = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryUtilisateur,
      variables: { id },
      fetchPolicy: 'network-only'
    })

    return res && res.data
  } catch (e) {
    console.log({ e })
    throw e
  }
}

const utilisateurs = async ({
  entrepriseIds,
  administrationIds,
  permissionIds,
  noms
}) => {
  try {
    const res = await graphqlClient.query({
      query: queryUtilisateurs,
      variables: {
        entrepriseIds,
        administrationIds,
        permissionIds,
        noms
      },
      fetchPolicy: 'network-only'
    })

    return res && res.data
  } catch (e) {
    console.log({ e })
  }
}

const utilisateurLogin = async ({ email, motDePasse }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurConnecter,
      variables: { email, motDePasse }
    })

    return res && res.data && res.data.utilisateurConnecter
  } catch (e) {
    console.log({ e })
    throw e.graphQLErrors && e.graphQLErrors[0] && e.graphQLErrors[0].message
  }
}

const identifier = async () => {
  try {
    const res = await await graphqlClient.query({
      query: queryUtilisateurIdentifier
    })

    return res && res.data && res.data.utilisateurIdentifier
  } catch (e) {
    throw e
  }
}

const utilisateurUpdate = async ({ utilisateur }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurModifier,
      variables: { utilisateur }
    })

    return res && res.data && res.data.utilisateurModifier
  } catch (e) {
    throw (e.graphQLErrors &&
      e.graphQLErrors[0] &&
      e.graphQLErrors[0].message) ||
      (e.message && e.message)
  }
}

const utilisateurAdd = async ({ utilisateur }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurAjouter,
      variables: { utilisateur }
    })

    return res && res.data
  } catch (e) {
    console.log({ e })
    throw (e.graphQLErrors &&
      e.graphQLErrors[0] &&
      e.graphQLErrors[0].message) ||
      (e.message && e.message)
  }
}

const utilisateurRemove = async ({ id }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurSupprimer,
      variables: { id }
    })

    return res && res.data
  } catch (e) {
    console.log({ e })
    throw (e.graphQLErrors &&
      e.graphQLErrors[0] &&
      e.graphQLErrors[0].message) ||
      (e.message && e.message)
  }
}

export {
  utilisateur,
  utilisateurs,
  utilisateurLogin,
  identifier,
  utilisateurUpdate,
  utilisateurAdd,
  utilisateurRemove
}
