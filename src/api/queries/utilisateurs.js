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
    $noms: [String!]
  ) {
    utilisateurs(
      administrationIds: $administrationIds
      entrepriseIds: $entrepriseIds
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
  mutation UtilisateurConnecter($id: ID!, $motDePasse: String!) {
    utilisateurConnecter(id: $id, motDePasse: $motDePasse) {
      utilisateur {
        id
        nom
        email
        permissions {
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
      permissions {
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

export {
  queryUtilisateur,
  queryUtilisateurs,
  queryUtilisateurIdentifier,
  mutationUtilisateurConnecter,
  mutationUtilisateurModifier,
  mutationUtilisateurAjouter,
  mutationUtilisateurSupprimer
}
