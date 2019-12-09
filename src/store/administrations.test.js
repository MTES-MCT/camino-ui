import administrations from './administrations'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import * as api from '../api/administrations'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api/administrations', () => ({
  administrations: jest.fn()
}))

console.log = jest.fn()

describe("état de la liste d'administrations", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    administrations.state = { list: [] }
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
      modules: { administrations },
      mutations,
      actions
    })
  })

  test('ajoute des administrations et les tri par ordre alphabétique', () => {
    const administrationsListe = [
      { nom: 'Petite Souris' },
      { nom: 'Koala' },
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' }
    ]
    administrations.state = { current: null, list: [] }
    const store = new Vuex.Store({ modules: { administrations } })
    store.commit('administrations/set', administrationsListe)

    expect(store.state.administrations.list).toEqual([
      { nom: 'Canard' },
      { nom: 'Escargot tout chaud' },
      { nom: 'Koala' },
      { nom: 'Koala' },
      { nom: 'Monstres & Cie' },
      { nom: 'Petite Souris' }
    ])
  })

  test('obtient la liste des administrations', async () => {
    const response = [{ id: 'administration-id', nom: 'administration-nom' }]
    const apiMock = api.administrations.mockResolvedValue(response)
    await store.dispatch('administrations/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.list).toEqual(response)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.administrations.mockResolvedValue(null)
    await store.dispatch('administrations/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administrations.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.administrations.mockRejectedValue(
      new Error('erreur api')
    )
    await store.dispatch('administrations/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
