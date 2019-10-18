import administration from './administration'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api'

jest.mock('../api', () => ({
  administration: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe("état de l'administration consultée", () => {
  let administrationId
  let store
  let actions
  let mutations
  let administrationInfo

  beforeEach(() => {
    administrationId = 71
    administrationInfo = { id: 71, nom: 'toto' }
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
    await store.dispatch('administration/get', administrationId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(administrationId)
    expect(store.state.administration.current).toEqual(administration)
  })

  test("n'obtient pas d'administration si l'api ne retourne rien pour cette id", async () => {
    const apiMock = api.administration.mockResolvedValue(null)
    await store.dispatch('administration/get', administrationId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(administrationId)
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.administration.current).toBeNull()
  })

  test("retourne une erreur de l'api dans l'obtention de l'administration", async () => {
    const apiMock = api.administration.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('administration/get', administrationId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(administrationId)
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'administration", () => {
    store.commit('administration/set', administrationInfo)
    store.commit('administration/reset')

    expect(store.state.administration.current).toBeNull()
  })
})
