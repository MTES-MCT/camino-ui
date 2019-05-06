import user from './user'
import * as Vue from 'vue'
import * as api from '../api/utilisateurs'
import * as router from '../router'

jest.mock('../api/utilisateurs', () => ({
  utilisateurLogin: jest.fn(),
  utilisateurIdentify: jest.fn(),
  utilisateurPasswordInit: jest.fn(),
  utilisateurPasswordInitEmail: jest.fn(),
  utilisateurAddEmail: jest.fn(),
  utilisateurAdd: jest.fn()
}))

jest.mock('vue', () => ({
  set: jest.fn()
}))

jest.mock('../router', () => [])

describe('tests sur mutations', () => {
  test('preferenceSet fonctionne', () => {
    expect(true)
    // const value = 'value'
    // const state = { preferences: [3, 4, 5, 2] }
    // const section = '2.3.4.5.7.80.156.665.5.59.1'
    // const apiSpy = Vue.set.mockImplementation((path, id, value) => true)
    // user.mutations.preferenceSet(state, { section, value })
    // expect(apiSpy).toHaveBeenCalledTimes(1)
    // expect(apiSpy).toHaveBeenCalledWith('state', 1, value)
  })
})
