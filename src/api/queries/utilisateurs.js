import gql from 'graphql-tag'
import fragmentUtilisateur from './fragments/utilisateur'

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
      utilisateur {
        id
        nom
        prenom
        email
        permission {
          id
          nom
        }
        entreprise {
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
      entreprise {
        id
      }
      administration {
        id
      }
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

  ${fragmentUtilisateur}
`

const mutationUtilisateurAjouter = gql`
  mutation UtilisateurAjouter($utilisateur: InputUtilisateurAjouter!) {
    utilisateurAjouter(utilisateur: $utilisateur) {
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

const mutationUtilisateurAjoutEmailEnvoyer = gql`
  mutation UtilisateurAjoutEmailEnvoyer($email: String!) {
    utilisateurAjoutEmailEnvoyer(email: $email)
  }
`

export {
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
}
