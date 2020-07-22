import administration from './administration'
import { createLocalVue } from '@vue/test-utils'
import * as api from '../api/administrations'
import Vuex from 'vuex'

jest.mock('../api/administrations', () => ({
  administration: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.info = jest.fn()

describe("état de l'administration consultée", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    administration.state = { current: null }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = { pageError: jest.fn(), apiError: jest.fn() }
    store = new Vuex.Store({
      modules: { administration },
      mutations,
      actions
    })
  })

  test("obtient les données d'un administration", async () => {
    const administration = { id: 71, nom: 'toto' }
    const apiMock = api.administration.mockResolvedValue(administration)
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.administration.current).toEqual(administration)
  })

  test("retourne une erreur de l'api dans l'obtention de l'administration", async () => {
    const apiMock = api.administration.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'administration", () => {
    store.commit('administration/set', { id: 71, nom: 'toto' })
    store.commit('administration/reset')

    expect(store.state.administration.current).toBeNull()
  })
})
