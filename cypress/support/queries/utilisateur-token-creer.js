export default `mutation UtilisateurTokenCreer($email: String!, $motDePasse: String!) {
  utilisateurTokenCreer(email: $email, motDePasse: $motDePasse) {
    ...utilisateurToken
    __typename
  }
}

fragment utilisateurToken on UtilisateurToken {
  utilisateur {
    id
    nom
    prenom
    email
    permission {
      id
      nom
      __typename
    }
    entreprises {
      id
      nom
      etablissements {
        id
        nom
        __typename
      }
      __typename
    }
    administrations {
      id
      nom
      __typename
    }
    __typename
  }
  token
  __typename
}`
