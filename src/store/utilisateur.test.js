import utilisateur, { actions } from './utilisateur'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api'

jest.mock('../api', () => ({
  utilisateur: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('utilisateur/actions', () => {
  let utilisateurId
  let store
  let actions
  let mutations
  let utilisateurInfo

  beforeEach(() => {
    utilisateurId = 71
    utilisateurInfo = { id: 71, nom: 'toto', prenom: 'asticot' }
    utilisateur.state = { current: null }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = { pageError: jest.fn(), apiError: jest.fn() }
    store = new Vuex.Store({
      modules: { utilisateur },
      mutations,
      actions
    })
  })

  test("charge un utilisateur depuis l'api", async () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    const apiMock = api.utilisateur.mockResolvedValue(utilisateur)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(store.state.utilisateur.current).toEqual(utilisateur)
  })

  test("ne trouve pas d'utilisateur dans l'api (id n'existe pas)", async () => {
    const apiMock = api.utilisateur.mockResolvedValue(null)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.utilisateur.current).toBeNull()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.utilisateur.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('ajoute un utilisateur', () => {
    store.commit('utilisateur/set', utilisateurInfo)

    expect(store.state.utilisateur.current).toEqual(utilisateurInfo)
  })

  test("supprime l'utilisateur", () => {
    store.commit('utilisateur/set', utilisateurInfo)
    store.commit('utilisateur/reset')

    expect(store.state.utilisateur.current).toBeNull()
  })
})
