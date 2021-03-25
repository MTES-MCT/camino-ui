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

  beforeEach(() => {
    entreprises.state = {
      list: [],
      total: 0,
      params: [
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
      preferences: {
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
      loaded: {
        url: false
      }
    }
    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      apiError: jest.fn(),
      pageError: jest.fn()
    }

    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupLoad: jest.fn()
    }

    store = createStore({
      modules: { entreprises },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('ajoute des entreprises', () => {
    const entreprisesListe = [
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ]
    store.commit('entreprises/set', { elements: entreprisesListe, total: 6 })

    expect(store.state.entreprises.list).toEqual([
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ])
  })

  test('obtient la liste des entreprises', async () => {
    const response = {
      elements: [{ id: 'entreprise-id', nom: 'entreprise-nom' }],
      total: 1
    }
    const apiMock = api.entreprises.mockResolvedValue(response)
    await store.dispatch('entreprises/urlLoad')

    expect(apiMock).toHaveBeenCalled()

    expect(store.state.entreprises.loaded.url).toBeTruthy()
    expect(store.state.entreprises.list).toEqual(response.elements)

    await store.dispatch('entreprises/urlLoad')
    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('entreprises/reset')
    expect(store.state.entreprises.list).toEqual([])
    expect(store.state.entreprises.loaded).toMatchObject({
      url: false
    })
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.entreprises.mockResolvedValue(null)
    await store.dispatch('entreprises/urlLoad', 'url')
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.entreprises.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('entreprises/urlLoad', 'url')

    expect(apiMock).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    let params = { noms: 'alpha' }

    const apiMock = api.entreprises.mockResolvedValue({})
    await store.dispatch('entreprises/preferencesSet', { section, params })
    expect(apiMock).not.toHaveBeenCalled()
    expect(store.state.entreprises.preferences.filtres.noms).toEqual('alpha')

    params = { noms: 'beta' }
    store.commit('entreprises/load', 'url')

    expect(store.state.entreprises.loaded.url).toBeTruthy()
    await store.dispatch('entreprises/preferencesSet', {
      section,
      params,
      pageReset: true
    })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.preferences.filtres.noms).toEqual('beta')
  })
})
