import titres from './titres'
import * as api from '../api/titres'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres', () => ({
  titres: jest.fn(),
  titresGeo: jest.fn(),
  titresGeoPolygon: jest.fn(),
  titresMetas: jest.fn()
}))

console.info = jest.fn()

describe('liste des titres', () => {
  let actions
  let mutations
  let store
  let titresCarte
  let titresListe
  let route

  beforeEach(() => {
    titresCarte = ['pointe-a-pitre', 'marseille-sud', 'matignon', 'crique']
    titresListe = ['pointe-a-pitre', 'marseille-sud', 'matignon']

    titres.state = {
      elements: [],
      total: 0,
      vueId: 'carte',
      metas: {
        domaines: [],
        types: [],
        statuts: []
      },
      params: {
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
      definitions: [
        { id: 'typesIds', type: 'strings', values: [] },
        { id: 'domainesIds', type: 'strings', values: [] },
        { id: 'statutsIds', type: 'strings', values: [] },
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
          values: ['nom', 'domaine', 'type', 'statut', 'activitesTotal']
        },
        {
          id: 'ordre',
          type: 'string',
          values: ['asc', 'desc']
        }
      ],
      urlDefinitions: [
        { id: 'zoom', type: 'number', min: 1, max: 18 },
        { id: 'centre', type: 'tuple' },
        { id: 'vueId', type: 'string', values: ['carte', 'table'] }
      ],
      initialized: false
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn(),
      urlQueryUpdate: jest.fn()
    }

    route = {
      namespaced: true,
      state: {
        query: {}
      }
    }

    store = createStore({
      modules: { titres, route },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('initialise le composant', async () => {
    const apiMetasMock = api.titresMetas.mockResolvedValue({
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

    const apiMock = api.titres.mockResolvedValue({
      titres: {
        elements: [{ id: 'titre-id', nom: 'Nom du titre' }],
        total: 1
      }
    })

    await store.dispatch('titres/init')

    expect(apiMetasMock).toHaveBeenCalled()
    expect(apiMock).not.toHaveBeenCalled()
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
    expect(store.state.titres.initialized).toBeTruthy()

    store.state.titres.vueId = 'table'

    await store.dispatch('titres/init')

    expect(apiMock).toHaveBeenCalled()

    expect(store.state.titres.elements).toEqual([
      { id: 'titre-id', nom: 'Nom du titre' }
    ])
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titresMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titres/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.titres.initialized).toBeFalsy()
  })

  test('obtient la liste des titres dans la vue "carte"', async () => {
    const apiMock = api.titresGeoPolygon.mockResolvedValue({
      titres: {
        elements: titresCarte,
        total: 4
      }
    })

    store.state.titres.initialized = true
    store.state.titres.params.carte.zoom = 8

    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(store.state.titres.elements).toEqual(titresCarte)
  })

  test('obtient la liste des titres dans la vue "carte" sans les périmètres', async () => {
    const apiMock = api.titresGeo.mockResolvedValue({
      titres: {
        elements: titresCarte,
        total: 4
      }
    })

    store.state.titres.initialized = true
    store.state.titres.params.carte.zoom = 7

    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })
    expect(store.state.titres.elements).toEqual(titresCarte)
  })

  test('obtient la liste des titres dans la vue "table"', async () => {
    const apiMock = api.titres.mockResolvedValue({
      titres: {
        elements: titresListe,
        total: 3
      }
    })
    store.state.titres.initialized = true
    store.state.titres.vueId = 'table'

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
    expect(store.state.titres.elements).toEqual(titresListe)

    store.commit('titres/reset')
    expect(store.state.titres.elements).toEqual([])
    expect(store.state.titres.initialized).toBeFalsy()
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.titresGeo.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    store.state.titres.initialized = true

    await store.dispatch('titres/get')

    expect(apiMock).toHaveBeenCalledWith({
      noms: 's',
      domainesIds: ['c', 'w'],
      statutsIds: ['val'],
      entreprises: 'fr-'
    })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test('change la vue et recharges les titres', async () => {
    const apiTableMock = api.titres.mockResolvedValue({
      titres: {
        elements: [{ id: 'titre-id', nom: 'Nom du titre' }],
        total: 1
      }
    })
    const apiGeoMock = api.titresGeo.mockResolvedValue({
      titres: {
        elements: [{ id: 'titre-id-geo', nom: 'Nom du titre' }],
        total: 1
      }
    })

    store.state.titres.elements = [{ id: 'titre-id-init', nom: 'Nom du titre' }]

    await store.dispatch('titres/vueSet', 'carte')

    expect(store.state.titres.elements).toEqual([
      { id: 'titre-id-init', nom: 'Nom du titre' }
    ])

    store.state.titres.initialized = true

    await store.dispatch('titres/vueSet', 'table')

    expect(apiTableMock).toHaveBeenCalled()
    expect(store.state.titres.vueId).toEqual('table')

    expect(store.state.titres.elements).toEqual([
      { id: 'titre-id', nom: 'Nom du titre' }
    ])

    await store.dispatch('titres/vueSet', 'carte')

    expect(apiGeoMock).not.toHaveBeenCalled()
    expect(store.state.titres.vueId).toEqual('carte')
    expect(store.state.titres.elements).toEqual([])
  })

  test("met à jour la liste si les paramètres d'url changent", async () => {
    const apiTableMock = api.titres.mockResolvedValue({
      titres: {
        elements: [{ id: 'titre-id-table', nom: 'Nom du titre' }],
        total: 1
      }
    })
    const apiGeoMock = api.titresGeo.mockResolvedValue({
      titres: {
        elements: [{ id: 'titre-id-geo', nom: 'Nom du titre' }],
        total: 1
      }
    })

    await store.dispatch('titres/routeUpdate')

    expect(apiTableMock).not.toHaveBeenCalled()
    expect(store.state.titres.elements).toEqual([])

    store.state.titres.initialized = true
    route.state.query.vueId = 'table'
    route.state.query.page = '4'
    route.state.query.typesIds = 'cx'
    await store.dispatch('titres/routeUpdate')

    expect(apiTableMock).toHaveBeenCalled()

    expect(store.state.titres.elements).toEqual([
      { id: 'titre-id-table', nom: 'Nom du titre' }
    ])

    expect(store.state.titres.params.table.page).toEqual(4)

    await store.dispatch('titres/routeUpdate')

    route.state.query.vueId = 'carte'
    route.state.query.zoom = 2
    await store.dispatch('titres/routeUpdate')

    expect(apiGeoMock).toHaveBeenCalled()

    expect(store.state.titres.elements).toEqual([
      { id: 'titre-id-geo', nom: 'Nom du titre' }
    ])
  })

  test('initialise les paramètres de filtre', async () => {
    const section = 'filtres'
    const params = { domainesIds: 'h' }
    await store.dispatch('titres/paramsSet', { section, params })

    expect(store.state.titres.params.filtres.domainesIds).toEqual('h')

    await store.dispatch('titres/paramsSet', { section, params })

    await store.dispatch('titres/paramsSet', {
      section: 'carte',
      params: { zoom: 5 }
    })
  })
})
