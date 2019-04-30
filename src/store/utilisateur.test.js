import utilisateur from './utilisateur'
import * as Vue from 'vue'
import * as apiUtilisateurs from '../api/utilisateurs'

// import { mockUtilisateur } from './__mocks__/utilisateur-user'
jest.mock('../api/utilisateurs', () => ({
  utilisateur: jest.fn()
}))

jest.mock('vue', () => ({
  set: jest.fn()
}))

describe("regarde si l'utilisateur s'affiche", () => {
  test("l'utilisateur existe", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()

    const returnVariable = true
    const idVariable = '71'
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await utilisateur.actions.get(
      { commit: commitSpy, dispatch: dispatchSpy },
      idVariable
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'utilisateur', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'set', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'utilisateur',
      { root: true }
    )
  })
  test("l'utilisateur n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const idVariable = '71'
    const apiSpy = apiUtilisateurs.utilisateur.mockImplementation(
      async idVariable => returnVariable
    )
    await utilisateur.actions.get(
      { commit: commitSpy, dispatch: dispatchSpy },
      idVariable
    )
    expect(commitSpy).toHaveBeenCalledTimes(2)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(idVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'utilisateur', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingRemove',
      'utilisateur',
      { root: true }
    )
    expect(dispatchSpy).toHaveBeenCalledWith('pageError', null, { root: true })
  })
})

describe('affichage de la vue utilisateur', () => {
  test('la vue se set correctement', () => {
    const idUtilisateur = '589'
    const apiSpy = Vue.set.mockImplementation(
      (state, current, utilisateur) => true
    )
    utilisateur.mutations.set('state', idUtilisateur)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'current', idUtilisateur)
  })
  test('la vue se reset correctement', () => {
    const apiSpy = Vue.set.mockImplementation((state, current) => true)
    utilisateur.mutations.reset('state')
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'current', null)
  })
})
