import gql from 'graphql-tag'

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

export { mutationUtilisateurConnecter, queryUtilisateurIdentifier }
