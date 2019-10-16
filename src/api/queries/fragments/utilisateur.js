import gql from 'graphql-tag'
import fragmentPermission from './permission'
import fragmentEntreprises from './entreprises'
import fragmentAdministrations from './administrations'

const fragmentUtilisateur = gql`
  fragment utilisateur on Utilisateur {
    id
    email
    nom
    prenom
    telephoneMobile
    telephoneFixe
    administrations {
      ...administrations
    }
    entreprises {
      ...entreprises
    }
    permission {
      ...permission
    }
  }

  ${fragmentAdministrations}

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
