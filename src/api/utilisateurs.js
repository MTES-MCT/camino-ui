import gql from 'graphql-tag'
import {
  fragmentUtilisateur,
  fragmentUtilisateurToken
} from './fragments/utilisateur'

import { apiQuery, apiMutate } from './_utils'

const utilisateur = apiQuery(
  gql`
    query Utilisateur($id: ID!) {
      utilisateur(id: $id) {
        ...utilisateur
      }
    }

    ${fragmentUtilisateur}
  `,
  { fetchPolicy: 'network-only' }
)

const utilisateurs = apiQuery(
  gql`
    query Utilisateurs(
      $administrationIds: [ID!]
      $entrepriseIds: [ID!]
      $permissionIds: [ID!]
      $noms: [String!]
    ) {
      utilisateurs(
        administrationIds: $administrationIds
        entrepriseIds: $entrepriseIds
        permissionIds: $permissionIds
        noms: $noms
      ) {
        ...utilisateur
      }
    }

    ${fragmentUtilisateur}
  `,
  { fetchPolicy: 'network-only' }
)

const utilisateurTokenCreer = apiMutate(gql`
  mutation UtilisateurTokenCreer($email: String!, $motDePasse: String!) {
    utilisateurTokenCreer(email: $email, motDePasse: $motDePasse) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const moi = apiQuery(gql`
  query Moi {
    moi {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurModifier = apiMutate(gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateurModification!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurCreer = apiMutate(gql`
  mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
    utilisateurCreer(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurSupprimer = apiMutate(gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseModifier = apiMutate(gql`
  mutation UtilisateurMotDePasseModifier(
    $id: ID!
    $motDePasse: String!
    $motDePasseNouveau1: String!
    $motDePasseNouveau2: String!
  ) {
    utilisateurMotDePasseModifier(
      id: $id
      motDePasse: $motDePasse
      motDePasseNouveau1: $motDePasseNouveau1
      motDePasseNouveau2: $motDePasseNouveau2
    ) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseInitialiser = apiMutate(gql`
  mutation UtilisateurMotDePasseInitialiser(
    $motDePasse1: String!
    $motDePasse2: String!
  ) {
    utilisateurMotDePasseInitialiser(
      motDePasse1: $motDePasse1
      motDePasse2: $motDePasse2
    ) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurMotDePasseEmailEnvoyer = apiMutate(gql`
  mutation UtilisateurMotDePasseEmailEnvoyer($email: String!) {
    utilisateurMotDePasseEmailEnvoyer(email: $email)
  }
`)

const utilisateurCreationEmailEnvoyer = apiMutate(gql`
  mutation UtilisateurCreationEmailEnvoyer($email: String!) {
    utilisateurCreationEmailEnvoyer(email: $email)
  }
`)

export {
  utilisateur,
  utilisateurs,
  moi,
  utilisateurTokenCreer,
  utilisateurModifier,
  utilisateurCreer,
  utilisateurSupprimer,
  utilisateurMotDePasseModifier,
  utilisateurMotDePasseInitialiser,
  utilisateurMotDePasseEmailEnvoyer,
  utilisateurCreationEmailEnvoyer
}
