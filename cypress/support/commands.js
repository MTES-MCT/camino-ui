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

import utilisateurCreerQuery from './queries/utilisateur-creer'
import utilisateurTokenCreerMutation from './queries/utilisateur-token-creer'
import utilisateurSupprimerMutation from './queries/utilisateur-supprimer'
import utilisateursQuery from './queries/utilisateurs'

const mock = Cypress.env('mock')
// const mock = true

const storeGet = () => cy.window().its('app.$store')

Cypress.Commands.add('mockGraphQL', stubs => {
  if (!mock) return

  cy.on('window:before:load', win => {
    cy.stub(win, 'fetch', (...args) => {
      const [url, request] = args
      if (url.indexOf(Cypress.env('apiUrl')) === -1) return

      const postBody = JSON.parse(request.body)
      const stubIndex = stubs.findIndex(
        ({ operation }) => postBody.operationName === operation
      )
      const stub = stubs.splice(stubIndex, 1)[0]

      if (!stub) {
        console.log(
          'mockGraphQL: could not find a stub',
          postBody.operationName
        )
        return
      }

      console.log('mockGraphQL:', stub.operation)

      return Promise.resolve({
        ok: true,
        text() {
          return Promise.resolve(JSON.stringify(stub.response))
        }
      })
    })
  })
})

Cypress.Commands.add('login', (email, motDePasse, permission) => {
  return mock
    ? cy.fixture(`utilisateur-token-creer-${permission}`).then(stub => {
        storeGet().then(store => {
          const data = stub.response.data.utilisateurTokenCreer
          store.dispatch('user/tokenSet', data.token)
          store.commit('user/set', data.utilisateur)

          return data
        })
      })
    : cy
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
            store.dispatch('user/tokenSet', data.token)
            window.localStorage.setItem('token', data.token)
            store.commit('user/set', data.utilisateur)

            return data
          })
        })
})

Cypress.Commands.add('userAdd', (utilisateur, permission) => {
  let token

  return mock
    ? cy.fixture(`utilisateur-${permission}`).then(stub => {
        storeGet().then(store => {
          const utilisateur = stub.response.data.utilisateur
          store.commit('utilisateurs/add', utilisateur)

          return utilisateur
        })
      })
    : cy
        .request({
          method: 'POST',
          url: Cypress.env('apiUrl'),
          body: {
            operationName: 'UtilisateurTokenCreer',
            variables: {
              email: Cypress.env('userSuperEmail'),
              motDePasse: Cypress.env('userSuperMotDePasse')
            },
            query: utilisateurTokenCreerMutation
          }
        })
        .then(res => {
          token = res.body.data.utilisateurTokenCreer.token
        })
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
          }).then(res => {
            storeGet().then(store => {
              const utilisateur = res.body.data.utilisateurCreer

              if (utilisateur) {
                store.commit('utilisateurs/add', utilisateur)
              }
            })
          })
        })
})

Cypress.Commands.add('userRemove', email => {
  let token
  if (mock) {
    return
  }

  return cy
    .request({
      method: 'POST',
      url: Cypress.env('apiUrl'),
      body: {
        operationName: 'UtilisateurTokenCreer',
        variables: {
          email: Cypress.env('userSuperEmail'),
          motDePasse: Cypress.env('userSuperMotDePasse')
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
      const utilisateur = res.body.data.utilisateurs.find(
        u => u.email === email
      )

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
