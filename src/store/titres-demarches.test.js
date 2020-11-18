import titresDemarches from './titres-demarches'
import * as api from '../api/titres-demarches'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  demarchesMetas: jest.fn(),
  demarches: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('liste des demarches', () => {
  let actions
  let mutations
  let store
  let demarchesListe
  beforeEach(() => {
    demarchesListe = ['demarche-1', 'demarche-2', 'demarche-3']
    titresDemarches.state = {
      list: [],
      total: 0,
      metas: {
        types: [],
        statuts: [],
        etapesTypes: [],
        titresTypes: [],
        titresDomaines: [],
        titresStatuts: []
      },
      params: [
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
      preferences: {
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
      loaded: {
        metas: false,
        url: false
      }
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessageAdd: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }

    store = new Vuex.Store({
      modules: { titresDemarches },
      mutations,
      actions
    })
  })

  test('récupère les métas pour afficher des démarches', async () => {
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

    await store.dispatch('titresDemarches/metasGet')

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

    await store.dispatch('titresDemarches/metasGet')

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

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('obtient la liste des demarches', async () => {
    const apiMock = api.demarches.mockResolvedValue({
      elements: demarchesListe
    })

    store.commit('titresDemarches/load', 'metas')
    await store.dispatch('titresDemarches/urlLoad')

    expect(store.state.titresDemarches.loaded.url).toBeTruthy()
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.list).toEqual(demarchesListe)

    await store.dispatch('titresDemarches/urlLoad')

    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('titresDemarches/reset')
    expect(store.state.titresDemarches.list).toEqual([])
    expect(store.state.titresDemarches.loaded).toMatchObject({
      url: false,
      metas: false
    })
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.demarches.mockRejectedValue(
      new Error("l'api ne répond pas")
    )

    store.commit('titresDemarches/load', 'metas')
    await store.dispatch('titresDemarches/urlLoad')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.demarches.mockRejectedValue('erreur api')
    await store.dispatch('titresDemarches/urlLoad')

    expect(store.state.titresDemarches.loaded.url).toBeTruthy()
    expect(apiMock).not.toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    let params = { noms: 'alpha' }
    const apiMock = api.demarches.mockResolvedValue({})

    await store.dispatch('titresDemarches/preferencesSet', { section, params })

    expect(apiMock).not.toHaveBeenCalled()

    expect(store.state.titresDemarches.preferences.filtres.noms).toEqual(
      'alpha'
    )

    params = { noms: 'beta' }

    store.commit('titresDemarches/load', 'metas')
    store.commit('titresDemarches/load', 'url')
    await store.dispatch('titresDemarches/preferencesSet', {
      section,
      params,
      pageReset: true
    })

    expect(store.state.titresDemarches.preferences.filtres.noms).toEqual('beta')
    expect(apiMock).toHaveBeenCalled()
  })
})
