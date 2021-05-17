import definitions from './definitions'
import * as api from '../api/metas'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/metas', () => ({
  definitions: jest.fn(),
  domaines: jest.fn(),
  demarchesStatuts: jest.fn(),
  demarchesTypes: jest.fn(),
  etapesTypes: jest.fn(),
  etapesStatuts: jest.fn(),
  substancesLegales: jest.fn(),
  titresStatuts: jest.fn(),
  titresTypesTypes: jest.fn()
}))

console.info = jest.fn()

describe('définitions du glossaire', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    definitions.state = {
      elements: [],
      entrees: []
    }

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupClose: jest.fn()
    }

    store = createStore({
      modules: { definitions },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les définitions', async () => {
    const response = [
      {
        id: 'aum',
        nom: 'Autorisation minière',
        table: null,
        description: 'description aum',
        elements: null,
        couleur: null
      },
      {
        id: 'dom',
        nom: 'Domaines miniers',
        table: 'domaines',
        description: 'description dom',

        elements: [
          {
            id: 'm',
            nom: 'minéraux et métaux',
            table: null,
            description: 'description m',
            elements: null,
            couleur: null
          }
        ],
        couleur: null
      }
    ]

    const apiMock = api.definitions.mockResolvedValue({ definitions: response })

    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.definitions.elements).toEqual(response)
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.definitions.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.definitions.mockResolvedValue({ definitions: null })
    await store.dispatch('definitions/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.definitions.elements).toEqual(null)
  })

  test('récupère les descriptions des domaines', async () => {
    const response = [
      {
        id: 'm',
        nom: 'minéraux et métaux',
        table: null,
        description: 'description m',
        elements: null,
        couleur: null
      }
    ]

    const apiMock = api.domaines.mockResolvedValue({ domaines: response })

    await store.dispatch('definitions/entreesGet', 'domaines')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.definitions.entrees).toEqual(response)
  })

  test('ne récupère pas de description sur la page principale ', async () => {
    await store.dispatch('definitions/entreesGet', '')
    expect(store.state.definitions.entrees).toEqual([])
  })

  test('ne récupère pas de description pour "titre-minier"', async () => {
    await store.dispatch('definitions/entreesGet', 'titre-minier')
    expect(store.state.definitions.entrees).toEqual([])
  })

  test("retourne une erreur de l'api lors de la récupération des domaines", async () => {
    const apiMock = api.domaines.mockRejectedValue(
      new Error("l'api ne répond pas")
    )

    await store.dispatch('definitions/entreesGet', 'domaines')

    expect(apiMock).toHaveBeenCalled()

    expect(actions.apiError).toHaveBeenCalled()
  })
})
