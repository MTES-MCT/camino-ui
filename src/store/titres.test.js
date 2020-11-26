import titres from './titres'
import * as api from '../api/titres'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres', () => ({
  titres: jest.fn(),
  titresGeo: jest.fn(),
  titresGeoPolygon: jest.fn(),
  titresMetas: jest.fn()
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
        carte: { zoom: null, centre: [], perimetre: [] },
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
          elements: ['nom', 'domaine', 'type', 'statut', 'activitesTotal']
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        }
      ],
      loaded: {
        metas: false,
        vue: false,
        filtres: false,
        component: false,
        urls: false
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

  test('récupère les métas pour visualiser les titres', async () => {
    const apiMock = api.titresMetas.mockResolvedValue({
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
    expect(store.state.titres.loaded.metas).toBeTruthy()

    await store.dispatch('titres/metasGet')
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titresMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titres/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.titres.metasLoaded).toBeFalsy()
  })

  test('consigne les composants chargés et obtient la liste de titres', async () => {
    const apiMock = api.titresGeo.mockResolvedValue({
      elements: titresCarte,
      total: 4
    })

    expect(store.state.titres.loaded.urls).toBeFalsy()

    await store.dispatch('titres/loaded', 'metas')
    await store.dispatch('titres/loaded', 'vue')
    await store.dispatch('titres/loaded', 'component')
    await store.dispatch('titres/loaded', 'filtres')

    expect(store.state.titres.loaded.urls).toBeTruthy()
    expect(apiMock).toHaveBeenNthCalledWith(1, {
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })

    expect(store.state.titres.list).toEqual(titresCarte)

    await store.dispatch('titres/loaded', 'filtres')

    expect(apiMock).toHaveBeenCalledTimes(1)
  })

  test('obtient la liste des titres dans la vue "carte"', async () => {
    const apiMock = api.titresGeoPolygon.mockResolvedValue({
      elements: titresCarte,
      total: 4
    })

    store.state.titres.loaded.metas = true
    store.state.titres.loaded.urls = true
    store.state.titres.preferences.carte.zoom = 8

    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(store.state.titres.list).toEqual(titresCarte)
  })

  test('obtient la liste des titres dans la vue "carte" sans les périmètres', async () => {
    const apiMock = api.titresGeo.mockResolvedValue({
      elements: titresCarte,
      total: 4
    })

    store.state.titres.loaded.metas = true
    store.state.titres.loaded.urls = true
    store.state.titres.preferences.carte.zoom = 7

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
    store.state.titres.vue = 'liste'
    store.state.titres.loaded.metas = true
    store.state.titres.loaded.urls = true

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

    store.commit('titres/reset')
    expect(store.state.titres.list).toEqual([])
    expect(store.state.titres.loaded).toMatchObject({
      urls: false,
      metas: false,
      filtres: false,
      component: false,
      vue: false
    })
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titresGeo.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    store.state.titres.loaded.metas = true
    store.state.titres.loaded.urls = true

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

    await store.dispatch('titres/preferencesSet', { section, params })

    await store.dispatch('titres/preferencesSet', {
      section: 'carte',
      params: { zoom: 5 }
    })
  })

  test('initialise la vue et obtient les titres', async () => {
    const apiMock = api.titres.mockResolvedValue({
      elements: titresListe,
      total: 4
    })
    await store.dispatch('titres/vueSet', 'carte')

    await store.dispatch('titres/loaded', 'metas')
    await store.dispatch('titres/loaded', 'urls')
    await store.dispatch('titres/vueSet', 'liste')
    expect(apiMock).toHaveBeenNthCalledWith(1, {
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-',
      page: 1,
      intervalle: 200,
      ordre: 'asc',
      colonne: 'nom'
    })
    expect(store.state.titres.vue).toEqual('liste')
    expect(store.state.titres.list).toEqual(titresListe)
    await store.dispatch('titres/vueSet', 'carte')

    expect(store.state.titres.vue).toEqual('carte')
    expect(apiMock).toHaveBeenCalledTimes(1)
  })
})
