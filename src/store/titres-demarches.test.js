import titresDemarches from './titres-demarches'
import * as api from '../api/titres-demarches'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  demarchesMetas: jest.fn(),
  demarches: jest.fn()
}))

console.info = jest.fn()

describe('liste des demarches', () => {
  let actions
  let mutations
  let store
  let demarchesListe
  let route

  beforeEach(() => {
    demarchesListe = ['demarche-1', 'demarche-2', 'demarche-3']
    titresDemarches.state = {
      elements: [],
      total: 0,
      metas: {
        types: [],
        statuts: [],
        etapesTypes: [],
        titresTypes: [],
        titresDomaines: [],
        titresStatuts: []
      },
      definitions: [
        { id: 'typesIds', type: 'strings', elements: [] },
        { id: 'statutsIds', type: 'strings', elements: [] },
        { id: 'etapesInclues', type: 'objects', elements: [] },
        { id: 'etapesExclues', type: 'objects', elements: [] },
        { id: 'titresDomainesIds', type: 'strings', elements: [] },
        { id: 'titresTypesIds', type: 'strings', elements: [] },
        { id: 'titresStatutsIds', type: 'strings', elements: [] },
        { id: 'titresNoms', type: 'string' },
        { id: 'titresEntreprises', type: 'string' },
        { id: 'titresSubstances', type: 'string' },
        { id: 'titresReferences', type: 'string' },
        { id: 'titresTerritoires', type: 'string' },
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: [
            'titreNom',
            'titreDomaine',
            'titreType',
            'titreStatut',
            'type',
            'statut'
          ]
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        }
      ],
      params: {
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: null
        },
        filtres: {
          typesIds: [],
          statutsIds: [],
          etapesInclues: [],
          etapesExclues: [],
          titresDomainesIds: [],
          titresTypesIds: [],
          titresStatutsIds: [],
          titresNoms: '',
          titresEntreprises: '',
          titresSubstances: '',
          titresReferences: '',
          titresTerritoires: ''
        }
      },
      initialized: false
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessageAdd: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn(),
      urlQueryUpdate: jest.fn()
    }

    route = {
      state: {
        query: {}
      }
    }

    store = createStore({
      modules: { titresDemarches, route },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('initialise le composant', async () => {
    const apiMock = api.demarchesMetas
      .mockResolvedValueOnce({
        demarchesTypes: [{ id: 'id-demarchesTypes' }],
        demarchesStatuts: [{ id: 'id-demarchesStatuts' }],
        etapesTypes: [{ id: 'id-etapesTypes' }],
        types: [{ id: 'id-types' }],
        domaines: [{ id: 'id-domaines' }],
        statuts: [{ id: 'id-statuts' }],
        truc: [{ id: 'id-truc' }]
      })
      .mockResolvedValueOnce({})

    await store.dispatch('titresDemarches/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.metas).toEqual({
      types: [{ id: 'id-demarchesTypes' }],
      statuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      titresTypes: [{ id: 'id-types' }],
      titresDomaines: [{ id: 'id-domaines' }],
      titresStatuts: [{ id: 'id-statuts' }]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titresDemarches/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.metas).toEqual({
      types: [{ id: 'id-demarchesTypes' }],
      statuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      titresTypes: [{ id: 'id-types' }],
      titresDomaines: [{ id: 'id-domaines' }],
      titresStatuts: [{ id: 'id-statuts' }]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.demarchesMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titresDemarches/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('obtient la liste des demarches', async () => {
    const apiMock = api.demarches.mockResolvedValue({
      elements: demarchesListe
    })

    store.state.titresDemarches.initialized = true

    await store.dispatch('titresDemarches/get')

    expect(store.state.titresDemarches.initialized).toBeTruthy()
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.elements).toEqual(demarchesListe)

    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('titresDemarches/reset')
    expect(store.state.titresDemarches.elements).toEqual([])
    expect(store.state.titresDemarches.initialized).toBeFalsy()
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.demarches.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    store.state.titresDemarches.initialized = true

    await store.dispatch('titresDemarches/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.elements).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.demarches.mockRejectedValue('erreur api')
    store.state.titresDemarches.initialized = true

    await store.dispatch('titresDemarches/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.elements).toEqual([])
  })

  test('initialise les paramètres de filtre', async () => {
    const section = 'filtres'
    const params = { noms: 'beta' }
    const apiMock = api.demarches.mockResolvedValue({})
    store.state.titresDemarches.initialized = true

    await store.dispatch('titresDemarches/paramsSet', { section, params })

    await store.dispatch('titresDemarches/paramsSet', {
      section,
      params,
      pageReset: true
    })

    expect(store.state.titresDemarches.params.filtres.noms).toEqual('beta')
    expect(apiMock).toHaveBeenCalled()
  })
})
