import utilisateur from './utilisateur'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as apiUtilisateurs from '../api/utilisateurs'

jest.mock('../api/utilisateurs', () => ({
  utilisateur: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('utilisateur/actions', () => {
  let idVariable
  let returnVariable
  let store

  beforeEach(() => {
    idVariable = '71'
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
    returnVariable = 71
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await store.dispatch('utilisateur/get', idVariable)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
    expect(store.state.utilisateur.current).toEqual(returnVariable)
  })

  test("ne trouve pas d'utilisateur dans l'api (id n'existe pas)", async () => {
    returnVariable = false
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await store.dispatch('utilisateur/get', idVariable)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
    expect(store.state.utilisateur.current).toEqual(null)
  })
})

describe('utilisateur/mutations', () => {
  test('ajoute un utilisateur', () => {
    const idUtilisateur = 71
    utilisateur.state = { current: null }
    const store = new Vuex.Store({ modules: { utilisateur } })
    store.commit('utilisateur/set', idUtilisateur)
    expect(store.state.utilisateur.current).toEqual(idUtilisateur)
  })

  test("supprime l'utilisateur", () => {
    utilisateur.state = { current: 71 }
    const store = new Vuex.Store({ modules: { utilisateur } })
    store.commit('utilisateur/reset')
    expect(store.state.utilisateur.current).toEqual(null)
  })
})
