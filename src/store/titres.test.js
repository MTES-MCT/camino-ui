import titres from './titres'
import * as Vue from 'vue'
import * as api from '../api/titres'
import { state, params, rootState } from './__mocks__/titres-titres'

jest.mock('vue', () => ({
  set: jest.fn()
}))

jest.mock('../api/titres', () => ({
  titres: jest.fn()
}))

describe('test de actions.get', () => {
  test('recupere les bons parametres', async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const apiSpy = api.titres.mockImplementation(
      (params, network) => returnVariable
    )
    await titres.actions.get({
      commit: commitSpy,
      dispatch: dispatchSpy,
      state,
      rootState
    })
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(params, 'network-only')
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'titres', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'set', returnVariable)
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `liste de titres mise à jour`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'loadingRemove', 'titres', {
      root: true
    })
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `liste de titres mise à jour`,
        type: 'success'
      },
      { root: true }
    )
  })
  test('ne recupere pas les parametres', async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const apiSpy = api.titres.mockImplementation(
      (params, network) => returnVariable
    )
    state.list.length = false
    await titres.actions.get({
      commit: commitSpy,
      dispatch: dispatchSpy,
      state,
      rootState
    })
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(params, 'network-only')
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'titres', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'set', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'loadingRemove', 'titres', {
      root: true
    })
  })
})

describe('affichage de la vue utilisateur', () => {
  test('la vue se set correctement', () => {
    const titre = []
    const apiSpy = Vue.set.mockImplementation((state, current, titres) => true)
    titres.mutations.set('state', titre)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'list', titre)
  })
})
