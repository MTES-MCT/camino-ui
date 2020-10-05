// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// --------------------------------------
// Mock GraphQL requests with stubs.
// --------------------------------------
// https://github.com/cypress-io/cypress-documentation/issues/122#issuecomment-409839089

import utilisateurCreationMessageEnvoyerMutation from './queries/utilisateur-creation-email'
import utilisateurCreerQuery from './queries/utilisateur-creer'
import utilisateurTokenCreerMutation from './queries/utilisateur-token-creer'
import utilisateurSupprimerMutation from './queries/utilisateur-supprimer'
import utilisateursQuery from './queries/utilisateurs'

const storeGet = () => cy.window().its('app.$store')

Cypress.Commands.add('userAccountUrl', email =>
  cy
    .request({
      method: 'POST',
      url: Cypress.env('apiUrl'),
      body: {
        operationName: 'UtilisateurCreationMessageEnvoyer',
        variables: { email },
        query: utilisateurCreationMessageEnvoyerMutation
      }
    })
    .then(res => res.body.data.utilisateurCreationMessageEnvoyer)
)

Cypress.Commands.add('login', (email, motDePasse) =>
  cy
    .request({
      method: 'POST',
      url: Cypress.env('apiUrl'),
      body: {
        operationName: 'UtilisateurTokenCreer',
        variables: { email, motDePasse },
        query: utilisateurTokenCreerMutation
      }
    })
    .then(res => {
      storeGet().then(store => {
        const data = res.body.data.utilisateurTokenCreer
        store.dispatch('user/tokensSet', data)
        store.commit('user/set', data.utilisateur)

        return data
      })
    })
)

Cypress.Commands.add('userAdd', utilisateur => {
  let token

  // se loggue en temps que super
  return (
    cy
      .request({
        method: 'POST',
        url: Cypress.env('apiUrl'),
        body: {
          operationName: 'UtilisateurTokenCreer',
          variables: {
            email: Cypress.env('userEmail'),
            motDePasse: Cypress.env('userPassword')
          },
          query: utilisateurTokenCreerMutation
        }
      })
      .then(res => {
        token = res.body.data.utilisateurTokenCreer.token
      })
      // créé un utilisateur
      .then(res => {
        cy.request({
          method: 'POST',
          url: Cypress.env('apiUrl'),
          body: {
            operationName: 'UtilisateurCreer',
            variables: { utilisateur },
            query: utilisateurCreerQuery
          },
          auth: { bearer: token }
        })
      })
  )
})

Cypress.Commands.add('userRemove', email => {
  let token

  return cy
    .request({
      method: 'POST',
      url: Cypress.env('apiUrl'),
      body: {
        operationName: 'UtilisateurTokenCreer',
        variables: {
          email: Cypress.env('userEmail'),
          motDePasse: Cypress.env('userPassword')
        },
        query: utilisateurTokenCreerMutation
      }
    })
    .then(res => {
      token = res.body.data.utilisateurTokenCreer.token
    })
    .then(() => {
      return cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl'),
        body: {
          operationName: 'Utilisateurs',
          variables: {},
          query: utilisateursQuery
        },
        auth: { bearer: token }
      })
    })
    .then(res => {
      const utilisateurs = res.body.data.utilisateurs
      const utilisateur = utilisateurs.find(u => u.email === email)

      if (!utilisateur) {
        return
      }

      return cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl'),
        body: {
          operationName: 'UtilisateurSupprimer',
          variables: { id: utilisateur.id },
          query: utilisateurSupprimerMutation
        },
        auth: { bearer: token }
      })
    })
})
