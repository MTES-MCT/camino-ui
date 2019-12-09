import activites from './activites'
import * as api from '../api/activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api/activites', () => ({
  activites: jest.fn()
}))

console.log = jest.fn()
describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    activites.state = {
      list: []
    }
    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      apiError: jest.fn(),
      pageError: jest.fn()
    }

    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupLoad: jest.fn()
    }

    store = new Vuex.Store({
      modules: { activites },
      mutations,
      actions,
      state: { titre: { current: { id: 5 } } }
    })
  })

  test('obtient la liste des activités', async () => {
    const response = [{ id: 'activite-id', nom: 'activite-nom' }]
    const apiMock = api.activites.mockResolvedValue(response)
    await store.dispatch('activites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.activites.list).toEqual(response)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.activites.mockResolvedValue(null)
    await store.dispatch('activites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.activites.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.activites.mockRejectedValue('erreur api')
    await store.dispatch('activites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })
})
