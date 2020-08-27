import titres from './titres'
import * as api from '../api/titres'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres', () => ({
  titres: jest.fn(),
  titresGeo: jest.fn(),
  metasTitres: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('liste des titres', () => {
  let actions
  let mutations
  let store
  let titresCarte
  let titresListe
  beforeEach(() => {
    titresCarte = ['pointe-a-pitre', 'marseille-sud', 'matignon', 'crique']
    titresListe = ['pointe-a-pitre', 'marseille-sud', 'matignon']
    titres.state = {
      list: [],
      total: 0,
      vue: 'carte',
      metas: {
        domaines: [],
        types: [],
        statuts: []
      },
      preferences: {
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: 'nom'
        },
        carte: {
          zoom: 4,
          centre: ['50', '50'],
          perimetre: [],
          zoomIni: 4,
          centreIni: ['50', '50']
        },
        filtres: {
          typesIds: null,
          entreprises: 'fr-',
          substances: null,
          references: null,
          territoires: null,
          noms: 's',
          domainesIds: ['c', 'w'],
          statutsIds: ['val']
        }
      },
      params: [
        { id: 'typesIds', type: 'strings' },
        { id: 'domainesIds', type: 'strings' },
        { id: 'statutsIds', type: 'strings' },
        { id: 'substances', type: 'string' },
        { id: 'noms', type: 'string' },
        { id: 'entreprises', type: 'string' },
        { id: 'references', type: 'string' },
        { id: 'territoires', type: 'string' },
        { id: 'page', type: 'number', value: 1, min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: [
            'nom',
            'domaine',
            'type',
            'statut',
            'activitesTotal',
            'substances',
            'titulaires'
          ]
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        }
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
      ],
      statuts: [
        { id: 'fait', nom: 'fait' },
        { id: 'afa', nom: '` faire`' }
      ],
      truc: [{ id: 'id-truc' }]
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
      statuts: [
        { id: 'fait', nom: 'fait' },
        { id: 'afa', nom: '` faire`' }
      ]
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

  test('obtient la liste des titres dans la vue "carte"', async () => {
    const apiMock = api.titresGeo.mockResolvedValue({
      elements: titresCarte,
      total: 4
    })
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(store.state.titres.list).toEqual(titresCarte)
  })

  test('obtient la liste des titres dans la vue "liste"', async () => {
    const apiMock = api.titres.mockResolvedValue({
      elements: titresListe,
      total: 3
    })
    titres.state.vue = 'liste'
    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-',
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: 'nom'
    })
    expect(store.state.titres.list).toEqual(titresListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titresGeo.mockRejectedValue(
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

  test('initialise la vue', async () => {
    await store.dispatch('titres/vueSet', 'liste')

    expect(store.state.titres.vue).toEqual('liste')
  })

  test('enregistre la vue du résultat de la recherce', async () => {
    await store.dispatch('titres/preferencesMapIni')

    expect(store.state.titres.preferences.carte.zoomIni).toEqual(4)
    expect(store.state.titres.preferences.carte.centreIni).toEqual(['50', '50'])
  })

  test('recentre la vue sur le résultat de la recherce', async () => {
    await store.dispatch('titres/preferencesMapReset')

    expect(store.state.titres.preferences.carte.zoom).toEqual(4)
    expect(store.state.titres.preferences.carte.centre).toEqual(['50', '50'])
  })
})
