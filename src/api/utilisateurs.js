import graphqlClient from '@/api/_graphql-client'
import graphqlErrorThrow from '@/api/_error-throw'

import {
  queryUtilisateur,
  queryUtilisateurs,
  queryUtilisateurIdentifier,
  mutationUtilisateurConnecter,
  mutationUtilisateurModifier,
  mutationUtilisateurAjouter,
  mutationUtilisateurSupprimer,
  mutationUtilisateurMotDePasseModifier,
  mutationUtilisateurMotDePasseInitialiser,
  mutationUtilisateurMotDePasseEmailEnvoyer,
  mutationUtilisateurAjoutEmailEnvoyer
} from '@/api/queries/utilisateurs'

const utilisateur = async id => {
  try {
    const res = await graphqlClient.query({
      query: queryUtilisateur,
      variables: { id },
      fetchPolicy: 'network-only'
    })

    return res && res.data && res.data.utilisateur
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
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

    return res && res.data && res.data.utilisateurs
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
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
    graphqlErrorThrow(e)
  }
}

const utilisateurIdentify = async () => {
  try {
    const res = await await graphqlClient.query({
      query: queryUtilisateurIdentifier
    })

    return res && res.data && res.data.utilisateurIdentifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
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
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurAdd = async ({ utilisateur }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurAjouter,
      variables: { utilisateur }
    })

    return res && res.data && res.data.utilisateurAjouter
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurRemove = async ({ utilisateurId }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurSupprimer,
      variables: { utilisateurId }
    })

    return res && res.data && res.data.utilisateurSupprimer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurPasswordUpdate = async ({
  id,
  motDePasse,
  motDePasseNouveau1,
  motDePasseNouveau2
}) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurMotDePasseModifier,
      variables: {
        id,
        motDePasse,
        motDePasseNouveau1,
        motDePasseNouveau2
      }
    })

    return res && res.data && res.data.utilisateurMotDePasseModifier
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurPasswordInitEmail = async ({ email }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurMotDePasseEmailEnvoyer,
      variables: {
        email
      }
    })

    return res && res.data && res.data.utilisateurMotDePasseEmailEnvoyer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurPasswordInit = async ({ motDePasse1, motDePasse2 }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurMotDePasseInitialiser,
      variables: { motDePasse1, motDePasse2 }
    })

    return res && res.data && res.data.utilisateurMotDePasseInitialiser
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

const utilisateurAddEmail = async ({ email }) => {
  try {
    const res = await graphqlClient.mutate({
      mutation: mutationUtilisateurAjoutEmailEnvoyer,
      variables: { email }
    })

    return res && res.data && res.data.utilisateurAjoutEmailEnvoyer
  } catch (e) {
    console.log({ e })
    graphqlErrorThrow(e)
  }
}

export {
  utilisateur,
  utilisateurs,
  utilisateurLogin,
  utilisateurIdentify,
  utilisateurUpdate,
  utilisateurAdd,
  utilisateurRemove,
  utilisateurPasswordUpdate,
  utilisateurPasswordInit,
  utilisateurPasswordInitEmail,
  utilisateurAddEmail
}
