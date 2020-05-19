import gql from 'graphql-tag'
import { apiQuery, apiMutate } from './_utils'

import {
  fragmentUtilisateur,
  fragmentUtilisateurToken
} from './fragments/utilisateur'
import { fragmentPermission, fragmentTitreType } from './fragments/metas'
import { fragmentEntreprises } from './fragments/entreprises'
import { fragmentAdministrations } from './fragments/administrations'

const metasUser = apiQuery(
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
  `,
  { fetchPolicy: 'network-only' }
)

const metasUtilisateur = apiQuery(
  gql`
    query MetasUtilisateur {
      permissions {
        ...permission
      }

      entreprises {
        ...entreprises
      }

      administrations {
        ...administrations
      }
    }

    ${fragmentPermission}

    ${fragmentEntreprises}

    ${fragmentAdministrations}
  `,
  { fetchPolicy: 'network-only' }
)

const utilisateur = apiQuery(
  gql`
    query Utilisateur($id: ID!) {
      utilisateur(id: $id) {
        ...utilisateur
      }
    }

    ${fragmentUtilisateur}
  `,
  { fetchPolicy: 'network-only' }
)

const utilisateurs = apiQuery(
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
      $prenoms: String
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
        prenoms: $prenoms
        emails: $emails
      ) {
        elements {
          ...utilisateur
        }
        total
      }
    }

    ${fragmentUtilisateur}
  `,
  { fetchPolicy: 'network-only' }
)

const utilisateurTokenCreer = apiMutate(gql`
  mutation UtilisateurTokenCreer($email: String!, $motDePasse: String!) {
    utilisateurTokenCreer(email: $email, motDePasse: $motDePasse) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereTokenCreer = apiMutate(gql`
  mutation UtilisateurCerbereTokenCreer($ticket: String!) {
    utilisateurCerbereTokenCreer(ticket: $ticket) {
      ...utilisateurToken
    }
  }

  ${fragmentUtilisateurToken}
`)

const utilisateurCerbereUrlObtenir = apiMutate(gql`
  mutation UtilisateurCerbereUrlObtenir($url: String!) {
    utilisateurCerbereUrlObtenir(url: $url)
  }
`)

const moi = apiQuery(gql`
  query Moi {
    moi {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurModifier = apiMutate(gql`
  mutation UtilisateurModifier($utilisateur: InputUtilisateurModification!) {
    utilisateurModifier(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurCreer = apiMutate(gql`
  mutation UtilisateurCreer($utilisateur: InputUtilisateurCreation!) {
    utilisateurCreer(utilisateur: $utilisateur) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurSupprimer = apiMutate(gql`
  mutation UtilisateurSupprimer($id: ID!) {
    utilisateurSupprimer(id: $id) {
      ...utilisateur
    }
  }

  ${fragmentUtilisateur}
`)

const utilisateurMotDePasseModifier = apiMutate(gql`
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

const utilisateurMotDePasseInitialiser = apiMutate(gql`
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

const utilisateurMotDePasseEmailEnvoyer = apiMutate(gql`
  mutation UtilisateurMotDePasseEmailEnvoyer($email: String!) {
    utilisateurMotDePasseEmailEnvoyer(email: $email)
  }
`)

const utilisateurCreationEmailEnvoyer = apiMutate(gql`
  mutation UtilisateurCreationEmailEnvoyer($email: String!) {
    utilisateurCreationEmailEnvoyer(email: $email)
  }
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
  utilisateurMotDePasseEmailEnvoyer,
  utilisateurCreationEmailEnvoyer
}
