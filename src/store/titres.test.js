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

describe('état de la liste des titres', () => {
  let actions
  let mutations
  let store
  let titresListe
  let user
  beforeEach(() => {
    titresListe = ['pointe-a-pitre', 'marseille-sud', 'matignon']
    user = {
      state: {
        preferences: {
          titres: {
            filtres: {
              noms: 's',
              entreprises: null,
              domaines: 'c,w',
              statuts: 'val',
              types: null,
              territoires: null,
              substances: null,
              references: null
            }
          }
        }
      }
    }
    titres.state = {
      list: [],
      filterIds: [
        'substances',
        'noms',
        'entreprises',
        'references',
        'territoires',
        'typeIds',
        'domaineIds',
        'statutIds'
      ]
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
      modules: { titres, user },
      mutations,
      actions
    })
  })

  test('récupere des paramètres et crée la liste des titres', async () => {
    const apiMock = api.titres.mockResolvedValue(titresListe)
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      noms: ['s'],
      domaineIds: ['c', 'w'],
      statutIds: ['val']
    })
    expect(actions.messageAdd).not.toHaveBeenCalled()
    expect(store.state.titres.list).toEqual(titresListe)
  })

  test('récupere des paramètres et modifie la liste de titres', async () => {
    const apiMock = api.titres.mockResolvedValue(titresListe.slice(1, 3))
    store.commit('titres/set', titresListe.slice(0, 1))
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({
      noms: ['s'],
      domaineIds: ['c', 'w'],
      statutIds: ['val']
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titres.list).toEqual(titresListe.slice(1, 3))
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titres.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({
      noms: ['s'],
      domaineIds: ['c', 'w'],
      statutIds: ['val']
    })
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })
})
