import utilisateurs from './utilisateurs'
import * as api from '../api/utilisateurs'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état de la liste des utilisateurs', () => {
  let store
  let actions
  let mutations
  beforeEach(() => {
    utilisateurs.state = { list: [], permissions: [] }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupClose: jest.fn()
    }
    store = new Vuex.Store({
      modules: { utilisateurs },
      mutations,
      actions
    })
  })

  test('obtient la liste des utilisateurs', async () => {
    const apiMock = api.utilisateurs.mockResolvedValue([
      { id: 71, nom: 'toto', prenom: 'asticot' }
    ])
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([
      { id: 71, nom: 'toto', prenom: 'asticot' }
    ])
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.utilisateurs.mockResolvedValue(null)
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("retourne une erreur de l'api dans l'obtention des utilisateurs", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
