import demarches from './demarches'
import * as api from '../api/demarches'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/demarches', () => ({
  demarches: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('liste des demarches', () => {
  let actions
  let mutations
  let store
  let demarchesListe
  beforeEach(() => {
    demarchesListe = ['demarche-1', 'demarche-2', 'demarche-3']
    demarches.state = {
      list: [],
      params: {
        arrays: [
          'typesIds',
          'statutsIds',
          'titresDomainesIds',
          'titresTypesIds',
          'titresStatutsIds'
        ],
        strings: ['page', 'intervalle', 'colonne', 'ordre']
      }
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { demarches },
      mutations,
      actions
    })
  })

  test('obtient la liste des demarches', async () => {
    const apiMock = api.demarches.mockResolvedValue(demarchesListe)
    await store.dispatch('demarches/get', {
      titresDomainesIds: 'c,w',
      titresStatutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      titresDomainesIds: ['c', 'w'],
      titresStatutsIds: ['val']
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.demarches.list).toEqual(demarchesListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.demarches.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('demarches/get', {
      titresDomainesIds: 'c,w',
      titresStatutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      titresDomainesIds: ['c', 'w'],
      titresStatutsIds: ['val']
    })
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
