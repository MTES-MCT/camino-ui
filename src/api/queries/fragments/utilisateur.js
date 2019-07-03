import gql from 'graphql-tag'
import fragmentPermission from './permission'
import fragmentEntreprises from './entreprises'
import fragmentAdministration from './administration'

const fragmentUtilisateur = gql`
  fragment utilisateur on Utilisateur {
    id
    email
    nom
    prenom
    telephoneMobile
    telephoneFixe
    administration {
      ...administration
    }
    entreprises {
      ...entreprises
    }
    permission {
      ...permission
    }
  }

  ${fragmentAdministration}

  ${fragmentEntreprises}

  ${fragmentPermission}
`

const fragmentUtilisateurToken = gql`
  fragment utilisateurToken on UtilisateurToken {
    utilisateur {
      id
      nom
      prenom
      email
      permission {
        id
        nom
      }
      entreprises {
        id
        nom
        etablissements {
          id
          nom
        }
      }
    }
    token
  }
`

export { fragmentUtilisateur, fragmentUtilisateurToken }
