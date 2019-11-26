export default `mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
  utilisateurCreer(utilisateur: $utilisateur) {
    ...utilisateur
    __typename
  }
}

fragment utilisateur on Utilisateur {
  id
  email
  nom
  prenom
  telephoneMobile
  telephoneFixe
  administrations {
    ...administrations
    __typename
  }
  entreprises {
    ...entreprises
    __typename
  }
  permission {
    ...permission
    __typename
  }
  __typename
}

fragment administrations on Administration {
  id
  nom
  __typename
}

fragment entreprises on Entreprise {
  id
  nom
  paysId
  legalSiren
  legalEtranger
  __typename
}

fragment permission on Permission {
  id
  nom
  __typename
}
`
