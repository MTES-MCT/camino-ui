import titres from './titres'
import * as api from '../api/titres'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres', () => ({
  titres: jest.fn(),
  metasTitres: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('liste des titres', () => {
  let actions
  let mutations
  let store
  let titresListe
  beforeEach(() => {
    titresListe = ['pointe-a-pitre', 'marseille-sud', 'matignon']
    titres.state = {
      list: [],
      metas: {
        domaines: [],
        types: [],
        statuts: []
      },
      preferences: {
        vue: { vueId: 'carte' },
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: 'nom'
        },
        carte: {
          zoom: null,
          centre: null
        },
        filtres: {
          typesIds: null,
          entreprises: 'fr-',
          substances: null,
          references: null,
          territoires: null,
          noms: 's',
          domainesIds: 'c,w',
          statutsIds: 'val'
        }
      },
      params: [
        { id: 'typesIds', type: 'array' },
        { id: 'domainesIds', type: 'array' },
        { id: 'statutsIds', type: 'array' },
        { id: 'substances', type: 'string' },
        { id: 'noms', type: 'string' },
        { id: 'entreprises', type: 'string' },
        { id: 'references', type: 'string' },
        { id: 'territoires', type: 'string' }
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
      modules: { titres },
      mutations,
      actions
    })
  })

  test('récupère les métas pour visualiser les titres', async () => {
    const apiMock = api.metasTitres.mockResolvedValue({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      types: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ]
    })

    await store.dispatch('titres/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titres.metas).toEqual({
      domaines: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      types: [
        { id: 'ifr', nom: 'Ifremer' },
        { id: 'dge', nom: 'DGEC' }
      ],
      statuts: []
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasTitres.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titres/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.titres.metasLoaded).toBeFalsy()
  })

  test('obtient la liste des titres', async () => {
    const apiMock = api.titres.mockResolvedValue(titresListe)
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titres.list).toEqual(titresListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titres.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { domainesIds: 'h' }
    await store.dispatch('titres/preferencesSet', { section, params })

    expect(store.state.titres.preferences.filtres.domainesIds).toEqual('h')
  })
})
