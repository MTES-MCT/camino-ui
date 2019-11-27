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
    token
  }

  ${fragmentUtilisateur}
`

export { fragmentUtilisateur, fragmentUtilisateurToken }
