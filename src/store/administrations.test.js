import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as api from '../api/administrations'
import administrations from './administrations'

jest.mock('../api/administrations', () => ({
  administrations: jest.fn(),
  administrationsMetas: jest.fn()
}))

console.info = jest.fn()

describe("liste d'administrations", () => {
  let store
  let actions
  let mutations
  let route

  beforeEach(() => {
    administrations.state = {
      elements: [],
      total: 0,
      metas: {
        types: []
      },
      definitions: [
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'type', 'abreviation']
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        },
        { id: 'typesIds', type: 'strings', elements: [] },
        { id: 'noms', type: 'string' }
      ],
      params: {
        table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null },
        filtres: { noms: '', typesIds: [] }
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
      modules: { administrations, route },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('ajoute des administrations', () => {
    const administrationsListe = [
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ]

    store.commit('administrations/set', {
      elements: administrationsListe,
      total: 6
    })

    expect(store.state.administrations.elements).toEqual([
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ])
  })

  test('initialise le composant', async () => {
    const apiMock = api.administrationsMetas.mockResolvedValue([
      { id: 'ope', nom: 'Opérateur' },
      { id: 'dea', nom: 'Déal' }
    ])

    await store.dispatch('administrations/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.metas).toEqual({
      types: [
        { id: 'ope', nom: 'Opérateur' },
        { id: 'dea', nom: 'Déal' }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.administrations.initialized).toBeTruthy()

    await store.dispatch('administrations/init')
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.administrationsMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('administrations/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.administrations.initialized).toBeFalsy()
  })

  test('obtient la liste des administrations', async () => {
    const response = {
      elements: [{ id: 'administration-id', nom: 'administration-nom' }],
      total: 1
    }
    const apiMock = api.administrations.mockResolvedValue(response)
    store.state.administrations.initialized = true

    await store.dispatch('administrations/get')
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.elements).toEqual(response.elements)

    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('administrations/reset')
    expect(store.state.administrations.elements).toEqual([])
    expect(store.state.administrations.initialized).toBeFalsy()
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.administrations.mockResolvedValue(null)
    store.state.administrations.initialized = true

    await store.dispatch('administrations/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.elements).toEqual([])
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.administrations.mockRejectedValue(
      new Error('erreur api')
    )

    store.state.administrations.initialized = true

    await store.dispatch('administrations/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.elements).toEqual([])
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les paramètres de filtre', async () => {
    const section = 'filtres'
    let params = { noms: 'ministère' }
    const apiMock = api.administrations.mockResolvedValue({})

    await store.dispatch('administrations/paramsSet', { section, params })

    expect(apiMock).not.toHaveBeenCalled()

    expect(store.state.administrations.params.filtres.noms).toEqual('ministère')

    params = { noms: 'opérateur' }

    await store.dispatch('administrations/paramsSet', {
      section,
      params,
      pageReset: true
    })

    expect(store.state.administrations.params.filtres.noms).toEqual('opérateur')
  })
})
