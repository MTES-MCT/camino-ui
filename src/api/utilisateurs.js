import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

import { fragmentUtilisateur } from './fragments/utilisateur'
import { fragmentPermission, fragmentTitreType } from './fragments/metas'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administrations'

const userMetas = apiGraphQLFetch(
  gql`
    query MetasUser {
      version

      domaines {
        id
        nom
        titresTypes {
          ...titreType
        }
      }

      entreprisesTitresCreation {
        ...entreprises
      }
    }

    ${fragmentTitreType}

    ${fragmentEntreprises}
  `
)

const utilisateurMetas = apiGraphQLFetch(
  gql`
    query UtilisateurMetas {
      permissions {
        ...permission
      }

      entreprises {
        elements {
          ...entreprises
        }
      }

      administrations {
        elements {
          ...administrations
        }
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

const utilisateurConnecter = apiGraphQLFetch(gql`
  mutation utilisateurConnecter($email: String!, $motDePasse: String!) {
    utilisateurConnecter(email: $email, motDePasse: $motDePasse) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurDeconnecter = apiGraphQLFetch(gql`
  mutation utilisateurDeconnecter {
    utilisateurDeconnecter
  }
`)

const utilisateurCerbereTokenCreer = apiGraphQLFetch(gql`
  mutation UtilisateurCerbereTokenCreer($ticket: String!) {
    utilisateurCerbereTokenCreer(ticket: $ticket) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
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
  mutation UtilisateurCreer(
    $utilisateur: InputUtilisateurCreation!
    $token: String
  ) {
    utilisateurCreer(utilisateur: $utilisateur, token: $token) {
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
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
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
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const newsletterInscrire = apiGraphQLFetch(gql`
  mutation NewsletterInscrire($email: String!) {
    newsletterInscrire(email: $email)
  }
`)

export {
  userMetas,
  utilisateurMetas,
  utilisateur,
  utilisateurs,
  moi,
  utilisateurConnecter,
  utilisateurDeconnecter,
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
  utilisateurEmailModifier,
  newsletterInscrire
}
