import entreprise from './entreprise'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api'

jest.mock('../api', () => ({
  entreprise: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe("état de l'entreprise consultée", () => {
  let entrepriseId
  let store
  let actions
  let mutations
  let entrepriseInfo

  beforeEach(() => {
    entrepriseId = 71
    entrepriseInfo = { id: 71, nom: 'toto' }
    entreprise.state = { current: null }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = { pageError: jest.fn(), apiError: jest.fn() }
    store = new Vuex.Store({
      modules: { entreprise },
      mutations,
      actions
    })
  })

  test("obtient les données d'un entreprise", async () => {
    const entreprise = { id: 71, nom: 'toto' }
    const apiMock = api.entreprise.mockResolvedValue(entreprise)
    await store.dispatch('entreprise/get', entrepriseId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(entrepriseId)
    expect(store.state.entreprise.current).toEqual(entreprise)
  })

  test("n'obtient pas d'entreprise si l'api ne retourne rien pour cette id", async () => {
    const apiMock = api.entreprise.mockResolvedValue(null)
    await store.dispatch('entreprise/get', entrepriseId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(entrepriseId)
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.entreprise.current).toBeNull()
  })

  test("retourne une erreur de l'api dans l'obtention de l'entreprise", async () => {
    const apiMock = api.entreprise.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('entreprise/get', entrepriseId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(entrepriseId)
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'entreprise", () => {
    store.commit('entreprise/set', entrepriseInfo)
    store.commit('entreprise/reset')

    expect(store.state.entreprise.current).toBeNull()
  })
})
