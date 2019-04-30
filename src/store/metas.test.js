import metas from './metas'
import * as Vue from 'vue'
import { state, rootState } from './__mocks__/metas-states'

jest.mock('vue', () => ({
  set: jest.fn()
}))

describe('actions bien effectues', () => {
  test('set fonctionne bien', () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const id = 'domaines'
    const ids = ['c']
    const values = [{ id: 'c' }]
    metas.actions.set(
      { state, commit: commitSpy, dispatch: dispatchSpy, rootState },
      { id, values }
    )
    expect(commitSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenCalledWith('set', { id, values })
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(
      'user/preferenceSet',
      { section: `filtres.${id}`, value: ids.join(',') || null },
      { root: true }
    )
  })
  test('set fonctionne bien', () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const id = 'types'
    const values = [{ id: 'axm' }]
    metas.actions.set(
      { state, commit: commitSpy, dispatch: dispatchSpy, rootState },
      { id, values }
    )
    expect(commitSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenCalledWith('set', { id, values })
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
  })
})

describe('affichage de la vue utilisateur', () => {
  test('la vue se set correctement', () => {
    const values = []
    const id = 46
    const apiSpy = Vue.set.mockImplementation((state, current, values) => true)
    metas.mutations.set('state', { id, values })
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', id, values)
  })
})
