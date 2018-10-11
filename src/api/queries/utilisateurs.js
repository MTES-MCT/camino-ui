import gql from 'graphql-tag'
import utilisateurFragment from './utilisateur-fragment'

const queryUtilisateur = gql`
  query Utilisateur($id: ID!) {
    utilisateur(id: $id) {
      ...utilisateur
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

export {
  queryUtilisateur,
  queryUtilisateurs,
  mutationUtilisateurConnecter,
  queryUtilisateurIdentifier
}
