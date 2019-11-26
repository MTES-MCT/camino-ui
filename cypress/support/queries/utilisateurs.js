export default `query Utilisateurs($administrationIds: [ID!], $entrepriseIds: [ID!], $permissionIds: [ID!], $noms: [String!]) {
  utilisateurs(administrationIds: $administrationIds, entrepriseIds: $entrepriseIds, permissionIds: $permissionIds, noms: $noms) {
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
  service
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
