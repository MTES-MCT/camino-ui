import gql from 'graphql-tag'
import {
  fragmentUtilisateur,
  fragmentUtilisateurToken
} from './fragments/utilisateur'

const queryUtilisateur = gql`
  query Utilisateur($id: ID!) {
    utilisateur(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`

const queryUtilisateurs = gql`
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
`

const mutationUtilisateurConnecter = gql`
  mutation UtilisateurConnecter($email: String!, $motDePasse: String!) {
    utilisateurConnecter(email: $email, motDePasse: $motDePasse) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`

const queryUtilisateurIdentifier = gql`
  query UtilisateurIdentifier {
    utilisateurIdentifier {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`

const mutationUtilisateurModifier = gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateurModification!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`

const mutationUtilisateurCreer = gql`
  mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
    utilisateurCreer(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`

const mutationUtilisateurSupprimer = gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`

const mutationUtilisateurMotDePasseModifier = gql`
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
`

const mutationUtilisateurMotDePasseInitialiser = gql`
  mutation UtilisateurMotDePasseInitialiser(
    $motDePasse1: String!
    $motDePasse2: String!
  ) {
    utilisateurMotDePasseInitialiser(
      motDePasse1: $motDePasse1
      motDePasse2: $motDePasse2
    )
  }
`

const mutationUtilisateurMotDePasseEmailEnvoyer = gql`
  mutation UtilisateurMotDePasseEmailEnvoyer($email: String!) {
    utilisateurMotDePasseEmailEnvoyer(email: $email)
  }
`

const mutationUtilisateurCreationEmailEnvoyer = gql`
  mutation UtilisateurCreationEmailEnvoyer($email: String!) {
    utilisateurCreationEmailEnvoyer(email: $email)
  }
`

export {
  queryUtilisateur,
  queryUtilisateurs,
  queryUtilisateurIdentifier,
  mutationUtilisateurConnecter,
  mutationUtilisateurModifier,
  mutationUtilisateurCreer,
  mutationUtilisateurSupprimer,
  mutationUtilisateurMotDePasseModifier,
  mutationUtilisateurMotDePasseInitialiser,
  mutationUtilisateurMotDePasseEmailEnvoyer,
  mutationUtilisateurCreationEmailEnvoyer
}
