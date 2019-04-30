import utilisateur from './utilisateur'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as apiUtilisateurs from '../api/utilisateurs'
import * as indexStore from './index'

jest.mock('../api/utilisateurs', () => ({
  utilisateur: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

describe("regarde si l'utilisateur s'affiche", () => {
  let idVariable
  let returnVariable
  let store

  beforeEach(() => {
    idVariable = '71'
    utilisateur.state = { current: null }
    store = new Vuex.Store({ modules: { utilisateur } })
  })

  test("l'utilisateur existe", async () => {
    returnVariable = true
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await store.dispatch('utilisateur/get', idVariable)
    console.log(store.state.utilisateur)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
  })
  test("l'utilisateur n'existe pas", async () => {
    returnVariable = false
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await store.dispatch('utilisateur/get', idVariable)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
  })
})

describe('affichage de la vue utilisateur', () => {
  test('set: ajoute un utilisateur', () => {
    const idUtilisateur = 71
    utilisateur.state = { current: null }
    const store = new Vuex.Store({ modules: { utilisateur } })
    store.commit('set', idUtilisateur)
    expect(store.state.substances.current).toEqual(idUtilisateur)
  })
  test('reset: supprime les utilisateurs', () => {
    utilisateur.state = { current: 71 }
    const store = new Vuex.Store({ modules: { utilisateur } })
    store.commit('reset')
    expect(store.state.substances.current).toEqual(null)
  })
})
