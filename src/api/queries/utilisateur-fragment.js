import gql from 'graphql-tag'

const utilisateurFragment = gql`
  fragment utilisateur on Utilisateur {
    id
    email
    nom
    prenom
    telephoneMobile
    telephoneFixe
    administration {
      id
      nom
    }
    entreprise {
      id
      nom
    }
    permissions {
      id
      nom
    }
  }
`

export default utilisateurFragment
