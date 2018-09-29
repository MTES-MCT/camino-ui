import graphqlClient from '@/api/_graphql-client'
import {
  mutationUtilisateurConnecter,
  queryUtilisateurIdentifier
} from '@/api/queries/utilisateur'

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
export { connecter, identifier }
