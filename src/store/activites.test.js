import activites from './activites'
import * as api from '../api/activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api/activites', () => ({
  activites: jest.fn()
}))

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn()
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

  test('valide une activité pour un titre', async () => {
    const apiMock = api.activites.mockResolvedValue([])

    await store.dispatch('activites/get', {
      typeId: 'grp',
      annee: 2018
    })

    expect(apiMock).toHaveBeenCalled()
  })
})
