import graphqlClient from '@/api/_graphql-client'
import {
  queryUtilisateur,
  queryUtilisateurs,
  mutationUtilisateurConnecter,
  queryUtilisateurIdentifier
} from '@/api/queries/utilisateurs'

const utilisateur = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryUtilisateur,
      variables: { id }
    })

    return res && res.data.utilisateur
  } catch (e) {
    console.log(e)
  }
}

const utilisateurs = async ({ entrepriseIds, administrationIds, noms }) => {
  try {
    const res = await graphqlClient.query({
      query: queryUtilisateurs,
      variables: {
        entrepriseIds,
        administrationIds,
        noms
      }
    })

    return res && res.data.utilisateurs
  } catch (e) {
    console.log(e)
  }
}

const connecter = async ({ id, motDePasse }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurConnecter,
      variables: { id, motDePasse }
    })

    return res && res.data && res.data.utilisateurConnecter
  } catch (e) {
    // console.log({ e })
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
export { utilisateur, utilisateurs, connecter, identifier }
