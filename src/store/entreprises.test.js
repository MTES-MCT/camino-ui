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
    entreprises.state = { list: [] }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }

    store = new Vuex.Store({
      modules: { entreprises },
      mutations,
      actions
    })
  })

  test('ajoute des entreprises et les tri par ordre alphabétique', () => {
    const entreprisesListe = [
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ]
    entreprises.state = { current: null, list: [] }
    const store = new Vuex.Store({ modules: { entreprises } })
    store.commit('entreprises/set', entreprisesListe)

    expect(store.state.entreprises.list).toEqual([
      { nom: 'Canard' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' },
      { nom: 'Koala' },
      { nom: 'Monstres & Cie' },
      { nom: 'Petite Souris' }
    ])
  })

  test('obtient la liste des entreprises', async () => {
    const response = [{ id: 'entreprise-id', nom: 'entreprise-nom' }]
    const apiMock = api.entreprises.mockResolvedValue(response)
    await store.dispatch('entreprises/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.entreprises.list).toEqual(response)
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
