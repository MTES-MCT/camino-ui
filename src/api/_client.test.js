import { apiGraphQLFetch } from './_client'
import gql from 'graphql-tag'

console.info = jest.fn()

describe('api client', () => {
  const { location } = window

  beforeAll(() => {
    delete window.location
    window.location = { reload: jest.fn() }
  })

  afterAll(() => {
    window.location = location
  })

  test('une réponse 200 du serveur ne génère pas d’erreur', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: {} }), { status: 200 })

    localStorage.setItem('accessToken', 'access_token')
    localStorage.setItem('refreshToken', 'refresh_token')

    await apiGraphQLFetch(
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

  test('une réponse 401 lance le rafraichissement du access token', async () => {
    const newAccessToken = 'new_access_token'
    fetch
      .mockResponseOnce(JSON.stringify({ data: {} }), { status: 401 })
      .mockResponseOnce(
        JSON.stringify({ data: { data: { accessToken: newAccessToken } } }),
        { status: 200 }
      )
      .mockResponseOnce(JSON.stringify({ data: {} }), { status: 200 })

    localStorage.setItem('accessToken', 'access_token')
    localStorage.setItem('refreshToken', 'refresh_token')

    await apiGraphQLFetch(
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
    fetch.mockResponse(JSON.stringify({ data: {} }), { status: 401 })

    localStorage.setItem('accessToken', 'access_token')
    localStorage.setItem('refreshToken', 'refresh_token')

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

    expect(error.status).toBe(401)
    expect(window.location.reload).toHaveBeenCalled()
  })
})
