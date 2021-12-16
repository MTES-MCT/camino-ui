import gql from 'graphql-tag'

import { apiGraphQLFetch, apiRestFetch } from './_client.js'

jest.mock('./fragments/utilisateur', () => ({
  fragmentUtilisateur: gql`
    fragment utilisateur on Utilisateur {
      id
      email
    }
  `
}))

console.info = jest.fn()
console.error = jest.fn()

describe('api client', () => {
  const { location } = window

  beforeEach(() => {
    delete window.location
    window.location = { reload: jest.fn() }
    process.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    window.location = location
  })

  test('une réponse 200 du serveur ne génère pas d’erreur', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { key: 'value' } }), {
      status: 200
    })

    const res = await apiGraphQLFetch(gql`
      query fakeQuery {
        toto {
          id
        }
      }
    `)()

    expect(res).toEqual('value')
  })

  test('une réponse 404 du serveur génère une erreur', async () => {
    fetch.mockResponse(JSON.stringify({ data: {} }), { status: 404 })

    let error
    try {
      await apiGraphQLFetch(
        gql`
          query fakeQuery {
            toto {
              id
            }
          }
        `
      )()
    } catch (e) {
      error = e
    }

    expect(error.message).toBe('HTTP 404 status.')
    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('un appel REST avec une réponse 200 ne fait pas d’erreur', async () => {
    fetch.mockResponse(JSON.stringify({ data: {} }), { status: 200 })

    await apiRestFetch('path')

    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('un appel REST avec une réponse 404 fait une erreur', async () => {
    fetch.mockResponse(JSON.stringify({ data: {} }), { status: 404 })

    let error
    try {
      await apiRestFetch('path')
    } catch (e) {
      error = e
    }

    expect(error.message).toBe('404')
    expect(window.location.reload).not.toHaveBeenCalled()
  })
})
