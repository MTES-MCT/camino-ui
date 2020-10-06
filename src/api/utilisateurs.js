import gql from 'graphql-tag'
import { apiFetch } from './_client'

import {
  fragmentUtilisateur,
  fragmentUtilisateurToken
} from './fragments/utilisateur'
import { fragmentPermission, fragmentTitreType } from './fragments/metas'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administrations'

const metasUser = apiFetch(
  gql`
    query MetasUser {
      version

      domaines {
        id
        nom
        titresTypes {
          ...titreType
        }
        titresCreation
      }
    }

    ${fragmentTitreType}
  `
)

const metasUtilisateur = apiFetch(
  gql`
    query MetasUtilisateur {
      permissions {
        ...permission
      }

      entreprises {
        elements {
          ...entreprises
        }
      }

      administrations {
        ...administrations
      }
    }

    ${fragmentPermission}

    ${fragmentEntreprises}

    ${fragmentAdministrations}
  `
)

const utilisateur = apiFetch(
  gql`
    query Utilisateur($id: ID!) {
      utilisateur(id: $id) {
        ...utilisateur
      }
    }

    ${fragmentUtilisateur}
  `
)

const utilisateurs = apiFetch(
  gql`
    query Utilisateurs(
      $intervalle: Int
      $page: Int
      $colonne: String
      $ordre: String
      $entrepriseIds: [ID]
      $administrationIds: [ID]
      $permissionIds: [ID]
      $noms: String
      $emails: String
    ) {
      utilisateurs(
        intervalle: $intervalle
        page: $page
        colonne: $colonne
        ordre: $ordre
        entrepriseIds: $entrepriseIds
        administrationIds: $administrationIds
        permissionIds: $permissionIds
        noms: $noms
        emails: $emails
      ) {
        elements {
          ...utilisateur
        }
        total
      }
    }

    ${fragmentUtilisateur}
  `
)

const utilisateurTokenCreer = apiFetch(gql`
  mutation UtilisateurTokenCreer($email: String!, $motDePasse: String!) {
    utilisateurTokenCreer(email: $email, motDePasse: $motDePasse) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereTokenCreer = apiFetch(gql`
  mutation UtilisateurCerbereTokenCreer($ticket: String!) {
    utilisateurCerbereTokenCreer(ticket: $ticket) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereUrlObtenir = apiFetch(gql`
  mutation UtilisateurCerbereUrlObtenir($url: String!) {
    utilisateurCerbereUrlObtenir(url: $url)
  }
`)

const moi = apiFetch(gql`
  query Moi {
    moi {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurModifier = apiFetch(gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateurModification!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurCreer = apiFetch(gql`
  mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
    utilisateurCreer(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurSupprimer = apiFetch(gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseModifier = apiFetch(gql`
  mutation UtilisateurMotDePasseModifier(
    $id: ID!
    $motDePasse: String!
    $motDePasseNouveau1: String!
    $motDePasseNouveau2: String!
  ) {
    utilisateurMotDePasseModifier(
      id: $id
      motDePasse: $motDePasse
      motDePasseNouveau1: $motDePasseNouveau1
      motDePasseNouveau2: $motDePasseNouveau2
    ) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseInitialiser = apiFetch(gql`
  mutation UtilisateurMotDePasseInitialiser(
    $motDePasse1: String!
    $motDePasse2: String!
  ) {
    utilisateurMotDePasseInitialiser(
      motDePasse1: $motDePasse1
      motDePasse2: $motDePasse2
    ) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurMotDePasseMessageEnvoyer = apiFetch(gql`
  mutation UtilisateurMotDePasseMessageEnvoyer($email: String!) {
    utilisateurMotDePasseMessageEnvoyer(email: $email)
  }
`)

const utilisateurCreationMessageEnvoyer = apiFetch(gql`
  mutation UtilisateurCreationMessageEnvoyer($email: String!) {
    utilisateurCreationMessageEnvoyer(email: $email)
  }
`)

const utilisateurEmailMessageEnvoyer = apiFetch(gql`
  mutation UtilisateurEmailMessageEnvoyer($email: String!) {
    utilisateurEmailMessageEnvoyer(email: $email)
  }
`)

const utilisateurEmailModifier = apiFetch(gql`
  mutation UtilisateurEmailModifier($emailToken: String!) {
    utilisateurEmailModifier(emailToken: $emailToken) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

export {
  metasUser,
  metasUtilisateur,
  utilisateur,
  utilisateurs,
  moi,
  utilisateurTokenCreer,
  utilisateurCerbereTokenCreer,
  utilisateurCerbereUrlObtenir,
  utilisateurModifier,
  utilisateurCreer,
  utilisateurSupprimer,
  utilisateurMotDePasseModifier,
  utilisateurMotDePasseInitialiser,
  utilisateurMotDePasseMessageEnvoyer,
  utilisateurCreationMessageEnvoyer,
  utilisateurEmailMessageEnvoyer,
  utilisateurEmailModifier
}
