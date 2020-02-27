import titres from './titres'
import * as api from '../api/titres'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres', () => ({
  titres: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('liste des titres', () => {
  let actions
  let mutations
  let store
  let titresListe
  beforeEach(() => {
    titresListe = ['pointe-a-pitre', 'marseille-sud', 'matignon']
    titres.state = {
      list: [],
      params: {
        arrays: ['typesIds', 'domainesIds', 'statutsIds'],
        strings: [
          'substances',
          'noms',
          'entreprises',
          'references',
          'territoires'
        ]
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
      modules: { titres },
      mutations,
      actions
    })
  })

  test('obtient la liste des titres', async () => {
    const apiMock = api.titres.mockResolvedValue(titresListe)
    await store.dispatch('titres/get', {
      noms: 's',
      domainesIds: 'c,w',
      statutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val']
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titres.list).toEqual(titresListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titres.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titres/get', {
      noms: 's',
      domainesIds: 'c,w',
      statutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val']
    })
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
