import gql from 'graphql-tag'
import { fragmentPermission } from './metas'
import { fragmentEntreprises } from './entreprises'
import { fragmentAdministrations } from './administrations'

const fragmentUtilisateur = gql`
  fragment utilisateur on Utilisateur {
    id
    nom
    prenom
    email
    telephoneMobile
    telephoneFixe
    entreprises {
      ...entreprises
    }
    administrations {
      ...administrations
    }
    permission {
      ...permission
    }

    modification
    suppression
    permissionModification
    entreprisesCreation
    utilisateursCreation

    sections {
      activites
      administrations
      utilisateurs
      metas
    }
  }

  ${fragmentEntreprises}

  ${fragmentAdministrations}

  ${fragmentPermission}
`

const fragmentUtilisateurToken = gql`
  fragment utilisateurToken on UtilisateurToken {
    utilisateur {
      ...utilisateur
    }
    accessToken
    refreshToken
  }

  ${fragmentUtilisateur}
`

export { fragmentUtilisateur, fragmentUtilisateurToken }
