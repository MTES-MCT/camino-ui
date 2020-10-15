import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api/administrations'
import administrations from './administrations'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api/administrations', () => ({
  administrations: jest.fn(),
  metasAdministrations: jest.fn()
}))

console.info = jest.fn()

describe("liste d'administrations", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    administrations.state = {
      list: [],
      total: 0,
      metas: {
        types: []
      },
      params: [
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
      preferences: {
        table: { page: 1, intervalle: 200, ordre: 'asc', colonne: null },
        filtres: { noms: '', typesIds: '' }
      },
      loaded: {
        metas: false,
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

    store = new Vuex.Store({
      modules: { administrations },
      mutations,
      actions
    })
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

    expect(store.state.administrations.list).toEqual([
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ])
  })

  test('récupère les métas pour visualiser les administrations', async () => {
    const apiMock = api.metasAdministrations.mockResolvedValue([
      { id: 'ope', nom: 'Opérateur' },
      { id: 'dea', nom: 'Déal' }
    ])

    await store.dispatch('administrations/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.metas).toEqual({
      types: [
        { id: 'ope', nom: 'Opérateur' },
        { id: 'dea', nom: 'Déal' }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.administrations.loaded.metas).toBeTruthy()

    await store.dispatch('administrations/metasGet')
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasAdministrations.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('administrations/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.administrations.metasLoaded).toBeFalsy()
  })

  test('obtient la liste des administrations', async () => {
    const response = {
      elements: [{ id: 'administration-id', nom: 'administration-nom' }],
      total: 1
    }
    const apiMock = api.administrations.mockResolvedValue(response)

    store.commit('administrations/loaded', 'metas')
    await store.dispatch('administrations/loaded')

    expect(store.state.administrations.loaded.url).toBeTruthy()
    expect(apiMock).toHaveBeenCalled()

    expect(store.state.administrations.list).toEqual(response.elements)

    await store.dispatch('administrations/loaded')
    expect(apiMock).toHaveBeenCalledTimes(1)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.administrations.mockResolvedValue(null)

    store.commit('administrations/loaded', 'metas')
    await store.dispatch('administrations/loaded', 'url')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.administrations.mockRejectedValue(
      new Error('erreur api')
    )

    store.commit('administrations/loaded', 'metas')

    await store.dispatch('administrations/loaded', 'url')

    expect(apiMock).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { noms: "la mine d'or" }

    await store.dispatch('administrations/preferencesSet', {
      section,
      params
    })

    expect(store.state.administrations.preferences.filtres.noms).toEqual(
      "la mine d'or"
    )
  })
})
