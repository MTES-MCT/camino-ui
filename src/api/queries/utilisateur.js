import gql from 'graphql-tag'

const mutationUtilisateurConnecter = gql`
  mutation UtilisateurConnecter($id: ID!, $motDePasse: String!) {
    utilisateurConnecter(id: $id, motDePasse: $motDePasse) {
      utilisateur {
        id
        nom
        email
        groupes {
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
      groupes {
        id
        nom
      }
    }
  }
`

export { mutationUtilisateurConnecter, queryUtilisateurIdentifier }
