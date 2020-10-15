import gql from 'graphql-tag'

jest.mock('./fragments/utilisateur', () => ({
  fragmentUtilisateurToken: gql`
    fragment utilisateurToken on UtilisateurToken {
      utilisateur {
        id
        email
      }
      accessToken
      refreshToken
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
    // permet de réinitialiser la variable globale apiUrl
    jest.resetModules()
    localStorage.setItem('accessToken', 'access_token')
    localStorage.setItem('refreshToken', 'refresh_token')
  })

  afterEach(() => {
    window.location = location
  })

  test('une réponse 200 du serveur ne génère pas d’erreur', async () => {
    // réimporte totalement le module client pour réinitialiser la variable globale apiUrl
    const client = require('./_client')

    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponseOnce(JSON.stringify({ data: {} }), { status: 200 })

    await client.apiGraphQLFetch(
      gql`
        query fakeQuery {
          toto {
            id
          }
        }
      `
    )()

    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('une réponse 404 du serveur génère une erreur', async () => {
    // réimporte totalement le module client pour réinitialiser la variable globale apiUrl
    const client = require('./_client')

    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponse(JSON.stringify({ data: {} }), { status: 404 })

    let error
    try {
      await client.apiGraphQLFetch(
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

    expect(error).toBe('API : 404')
    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('une réponse 401 lance le rafraichissement du access token', async () => {
    const client = require('./_client')

    const newAccessToken = 'new_access_token'
    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponseOnce(JSON.stringify({ data: {} }), { status: 401 })
      .mockResponseOnce(
        JSON.stringify({ data: { data: { accessToken: newAccessToken } } }),
        { status: 200 }
      )
      .mockResponseOnce(JSON.stringify({ data: {} }), { status: 200 })

    await client.apiGraphQLFetch(
      gql`
        query fakeQuery {
          toto {
            id
          }
        }
      `
    )()

    expect(localStorage.getItem('accessToken')).toBe(newAccessToken)
    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('si le refreshToken n’est plus valide, on actualise la page', async () => {
    const client = require('./_client')

    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponse(JSON.stringify({ data: {} }), { status: 401 })

    let error
    try {
      await client.apiGraphQLFetch(
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

    expect(error.status).toBe(401)
    expect(window.location.reload).toHaveBeenCalled()
  })

  test('un appel REST avec une réponse 200 ne fait pas d’erreur', async () => {
    const client = require('./_client')

    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponse(JSON.stringify({ data: {} }), { status: 200 })

    await client.apiRestFetch('path')

    expect(window.location.reload).not.toHaveBeenCalled()
  })

  test('un appel REST avec une réponse 404 fait une erreur', async () => {
    const client = require('./_client')

    fetch
      .mockResponseOnce('http://apiurl')
      .mockResponse(JSON.stringify({ data: {} }), { status: 404 })

    let error
    try {
      await client.apiRestFetch('path')
    } catch (e) {
      error = e
    }

    expect(error).toBe('API : 404')
    expect(window.location.reload).not.toHaveBeenCalled()
  })
})
