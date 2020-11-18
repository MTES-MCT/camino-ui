import titresActivites from './titres-activites'
import * as api from '../api/titres-activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-activites', () => ({
  activitesMetas: jest.fn(),
  activites: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    titresActivites.state = {
      list: [],
      total: 0,
      metas: {
        types: [],
        annees: [],
        statuts: [],
        titresDomaines: [],
        titresTypes: [],
        titresStatuts: []
      },
      params: [
        { id: 'typesIds', type: 'strings', elements: [] },
        { id: 'statutsIds', type: 'strings', elements: [] },
        { id: 'annees', type: 'numbers', elements: [] },
        { id: 'titresNoms', type: 'string' },
        { id: 'titresEntreprises', type: 'string' },
        { id: 'titresSubstances', type: 'string' },
        { id: 'titresReferences', type: 'string' },
        { id: 'titresTerritoires', type: 'string' },
        { id: 'titresTypesIds', type: 'strings', elements: [] },
        { id: 'titresDomainesIds', type: 'strings', elements: [] },
        { id: 'titresStatutsIds', type: 'strings', elements: [] },
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['titreNom', 'titulaires', 'annee', 'periode', 'statut']
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
          annees: [],
          titresNoms: '',
          titresEntreprises: '',
          titresSubstances: '',
          titresReferences: '',
          titresTerritoires: '',
          titresTypesIds: [],
          titresDomainesIds: [],
          titresStatutsIds: []
        }
      },
      loaded: {
        metas: false,
        url: false
      }
    }

    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      apiError: jest.fn(),
      pageError: jest.fn()
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
      modules: { titresActivites },
      mutations,
      actions,
      state: { titre: { current: { id: 5 } } }
    })
  })

  const activitesTypes = [{ id: 'grp', nom: "rapport trimestriel d'activité" }]
  const activitesAnnees = [2020, 2019]
  const activitesStatuts = [
    { id: 'abs', nom: 'absent', couleur: 'error' },
    { id: 'enc', nom: 'en construction', couleur: 'warning' },
    { id: 'dep', nom: 'déposé', couleur: 'success' },
    { id: 'fer', nom: 'cloturé', couleur: 'neutral' }
  ]
  const domaines = [
    { id: 'm', nom: 'minéraux et métaux' },
    { id: 'w', nom: 'granulats marins' }
  ]
  const statuts = [
    { id: 'val', nom: 'valide', couleur: 'success' },
    { id: 'ech', nom: 'échu', couleur: 'neutral' }
  ]
  const types = [
    { id: 'cx', nom: 'concession', exploitation: true },
    { id: 'pr', nom: 'permis exclusif de recherches', exploitation: false }
  ]

  test('récupère les métas pour afficher les activités', async () => {
    const apiMock = api.activitesMetas
      .mockResolvedValueOnce({
        activitesTypes,
        activitesAnnees,
        activitesStatuts,
        domaines,
        statuts,
        types,
        truc: [{ id: 'id-truc' }]
      })
      .mockResolvedValueOnce({})

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas).toEqual({
      types: activitesTypes,
      annees: [
        { id: 2020, nom: 2020 },
        { id: 2019, nom: 2019 }
      ],
      statuts: activitesStatuts,
      titresDomaines: domaines,
      titresStatuts: statuts,
      titresTypes: types
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas).toEqual({
      types: [{ id: 'grp', nom: "rapport trimestriel d'activité" }],
      annees: [
        { id: 2020, nom: 2020 },
        { id: 2019, nom: 2019 }
      ],
      statuts: activitesStatuts,
      titresDomaines: domaines,
      titresStatuts: statuts,
      titresTypes: types
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.activitesMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test('obtient la liste des activités', async () => {
    const response = {
      elements: ['activite-1', 'activite-2', 'activite-3'],
      total: 3
    }
    const apiMock = api.activites.mockResolvedValueOnce(response)

    store.commit('titresActivites/load', 'metas')
    await store.dispatch('titresActivites/urlLoad')

    expect(store.state.titresActivites.loaded.url).toBeTruthy()
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual(response.elements)

    await store.dispatch('titresActivites/urlLoad')

    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('titresActivites/reset')
    expect(store.state.titresActivites.list).toEqual([])
    expect(store.state.titresActivites.loaded).toMatchObject({
      url: false,
      metas: false
    })
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.activites.mockResolvedValue(null)

    store.commit('titresActivites/load', 'metas')
    await store.dispatch('titresActivites/urlLoad')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.activites.mockRejectedValue('erreur api')
    await store.dispatch('titresActivites/urlLoad')

    expect(store.state.titresActivites.loaded.url).toBeTruthy()
    expect(apiMock).not.toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    let params = { noms: 'alpha' }
    const apiMock = api.activites.mockResolvedValue({})

    await store.dispatch('titresActivites/preferencesSet', { section, params })

    expect(apiMock).not.toHaveBeenCalled()

    expect(store.state.titresActivites.preferences.filtres.noms).toEqual(
      'alpha'
    )

    params = { noms: 'beta' }

    store.commit('titresActivites/load', 'metas')
    store.commit('titresActivites/load', 'url')
    await store.dispatch('titresActivites/preferencesSet', {
      section,
      params,
      pageReset: true
    })

    expect(store.state.titresActivites.preferences.filtres.noms).toEqual('beta')
    expect(apiMock).toHaveBeenCalled()
  })
})
