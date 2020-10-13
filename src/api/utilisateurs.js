import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import {
  fragmentUtilisateur,
  fragmentUtilisateurToken
} from './fragments/utilisateur'
import { fragmentPermission, fragmentTitreType } from './fragments/metas'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administrations'

const metasUser = apiGraphQLFetch(
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

const metasUtilisateur = apiGraphQLFetch(
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

const utilisateur = apiGraphQLFetch(
  gql`
    query Utilisateur($id: ID!) {
      utilisateur(id: $id) {
        ...utilisateur
      }
    }

    ${fragmentUtilisateur}
  `
)

const utilisateurs = apiGraphQLFetch(
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

const utilisateurTokenCreer = apiGraphQLFetch(gql`
  mutation UtilisateurTokenCreer($email: String!, $motDePasse: String!) {
    utilisateurTokenCreer(email: $email, motDePasse: $motDePasse) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereTokenCreer = apiGraphQLFetch(gql`
  mutation UtilisateurCerbereTokenCreer($ticket: String!) {
    utilisateurCerbereTokenCreer(ticket: $ticket) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereUrlObtenir = apiGraphQLFetch(gql`
  mutation UtilisateurCerbereUrlObtenir($url: String!) {
    utilisateurCerbereUrlObtenir(url: $url)
  }
`)

const moi = apiGraphQLFetch(gql`
  query Moi {
    moi {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurModifier = apiGraphQLFetch(gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateurModification!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurCreer = apiGraphQLFetch(gql`
  mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
    utilisateurCreer(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurSupprimer = apiGraphQLFetch(gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseModifier = apiGraphQLFetch(gql`
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

const utilisateurMotDePasseInitialiser = apiGraphQLFetch(gql`
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

const utilisateurMotDePasseMessageEnvoyer = apiGraphQLFetch(gql`
  mutation UtilisateurMotDePasseMessageEnvoyer($email: String!) {
    utilisateurMotDePasseMessageEnvoyer(email: $email)
  }
`)

const utilisateurCreationMessageEnvoyer = apiGraphQLFetch(gql`
  mutation UtilisateurCreationMessageEnvoyer($email: String!) {
    utilisateurCreationMessageEnvoyer(email: $email)
  }
`)

const utilisateurEmailMessageEnvoyer = apiGraphQLFetch(gql`
  mutation UtilisateurEmailMessageEnvoyer($email: String!) {
    utilisateurEmailMessageEnvoyer(email: $email)
  }
`)

const utilisateurEmailModifier = apiGraphQLFetch(gql`
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
