import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api/entreprises'
import entreprises from './entreprises'

const localVue = createLocalVue()
localVue.use(Vuex)

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
      total: null,
      params: [
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'legalSiren']
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        },
        { id: 'nomSiren', type: 'string' }
      ],
      preferences: {
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: null
        },
        filtres: {
          nomSiren: ''
        }
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
      modules: { entreprises },
      mutations,
      actions
    })
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
    entreprises.state = { current: null, list: [], total: 0 }
    const store = new Vuex.Store({ modules: { entreprises } })
    store.commit('entreprises/set', { entreprises: entreprisesListe, total: 6 })

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
      entreprises: [{ id: 'entreprise-id', nom: 'entreprise-nom' }],
      total: 1
    }
    const apiMock = api.entreprises.mockResolvedValue(response)
    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.list).toEqual(response.entreprises)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.entreprises.mockResolvedValue(null)
    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur pour obtenir des utilisateurs", async () => {
    const apiMock = api.entreprises.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
