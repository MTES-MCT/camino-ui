import gql from 'graphql-tag'
import utilisateurFragment from './utilisateur-fragment'

const queryUtilisateur = gql`
  query Utilisateur($id: ID!) {
    utilisateur(id: $id) {
      ...utilisateur
    }

    permissions {
      id
      nom
    }
  }

  ${utilisateurFragment}
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

    permissions {
      id
      nom
    }
  }

  ${utilisateurFragment}
`

const mutationUtilisateurConnecter = gql`
  mutation UtilisateurConnecter($email: String!, $motDePasse: String!) {
    utilisateurConnecter(email: $email, motDePasse: $motDePasse) {
      utilisateur {
        id
        nom
        prenom
        email
        permission {
          id
          nom
        }
      }
      token
    }
  }
`

const queryUtilisateurIdentifier = gql`
  query UtilisateurIdentifier {
    utilisateurIdentifier {
      id
      nom
      prenom
      permission {
        id
        nom
      }
    }
  }
`

const mutationUtilisateurModifier = gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateur!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${utilisateurFragment}
`

const mutationUtilisateurAjouter = gql`
  mutation UtilisateurAjouter($utilisateur: InputUtilisateurAjouter!) {
    utilisateurAjouter(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${utilisateurFragment}
`

const mutationUtilisateurSupprimer = gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${utilisateurFragment}
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

  ${utilisateurFragment}
`

export {
  queryUtilisateur,
  queryUtilisateurs,
  queryUtilisateurIdentifier,
  mutationUtilisateurConnecter,
  mutationUtilisateurModifier,
  mutationUtilisateurAjouter,
  mutationUtilisateurSupprimer,
  mutationUtilisateurMotDePasseModifier
}
