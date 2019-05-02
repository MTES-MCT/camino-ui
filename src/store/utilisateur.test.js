import utilisateur from './utilisateur'
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

  beforeEach(() => {
    utilisateurId = 71
    utilisateur.state = { current: null }
    store = new Vuex.Store({
      modules: { utilisateur },
      mutations: {
        loadingAdd: jest.fn(),
        loadingRemove: jest.fn()
      },
      actions: { pageError: jest.fn(), apiError: jest.fn() }
    })
  })

  test("charge un utilisateur depuis l'api", async () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    const apiMock = api.utilisateur.mockResolvedValue(utilisateur)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(store.state.utilisateur.current).toEqual(utilisateur)
  })

  test("ne trouve pas d'utilisateur dans l'api (id n'existe pas)", async () => {
    const apiMock = api.utilisateur.mockResolvedValue(null)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(store.state.utilisateur.current).toBeNull()
  })

  test("le chargement de l'utilisateur renvoie une erreur", async () => {
    const apiMock = api.utilisateur.mockRejectedValue(
      new Error('erreur utilisateur')
    )
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  test('ajoute un utilisateur', () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    store.commit('utilisateur/set', utilisateur)

    expect(store.state.utilisateur.current).toEqual(utilisateur)
  })

  test("supprime l'utilisateur", () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    store.commit('utilisateur/set', utilisateur)
    store.commit('utilisateur/reset')

    expect(store.state.utilisateur.current).toBeNull()
  })
})
