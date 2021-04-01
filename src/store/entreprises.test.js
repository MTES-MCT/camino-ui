import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as api from '../api/entreprises'
import entreprises from './entreprises'

jest.mock('../api/entreprises', () => ({
  entreprises: jest.fn()
}))

console.info = jest.fn()

describe("liste d'entreprises", () => {
  let store
  let actions
  let mutations
  let route

  beforeEach(() => {
    entreprises.state = {
      elements: [],
      total: 0,
      definitions: [
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'siren']
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        },
        { id: 'noms', type: 'string' }
      ],
      params: {
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: null
        },
        filtres: {
          noms: ''
        }
      },
      initialized: false
    }
    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      apiError: jest.fn(),
      pageError: jest.fn(),
      urlQueryUpdate: jest.fn()
    }

    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupLoad: jest.fn()
    }

    route = {
      state: {
        query: {}
      }
    }

    store = createStore({
      modules: { entreprises, route },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('obtient la liste des entreprises', async () => {
    const response = {
      elements: [{ id: 'entreprise-id', nom: 'entreprise-nom' }],
      total: 1
    }
    const apiMock = api.entreprises.mockResolvedValue(response)
    store.state.entreprises.initialized = true

    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()

    expect(store.state.entreprises.elements).toEqual(response.elements)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.entreprises.mockResolvedValue(null)
    store.state.entreprises.initialized = true

    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.elements).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.entreprises.mockRejectedValue(new Error('erreur api'))
    store.state.entreprises.initialized = true

    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les paramètres de filtre', async () => {
    const section = 'filtres'
    const params = { noms: 'alpha' }
    const apiMock = api.entreprises.mockResolvedValue({})
    store.state.entreprises.initialized = true

    await store.dispatch('entreprises/paramsSet', { section, params })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.params.filtres.noms).toEqual('alpha')
  })
})
