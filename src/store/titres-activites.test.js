import titresActivites from './titres-activites'
import * as api from '../api/titres-activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-activites', () => ({
  metasActivites: jest.fn(),
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
      total: null,
      metas: {
        types: [],
        annees: []
      },
      params: [
        { id: 'typesIds', type: 'strings', elements: [] },
        { id: 'annees', type: 'numbers', elements: [] },
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['titreNom', 'titulaires', 'periode', 'statut']
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
          annees: []
        }
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

  test('récupère les métas pour afficher les activités', async () => {
    const apiMock = api.metasActivites
      .mockResolvedValueOnce({
        activitesTypes: [
          {
            id: 'grp',
            nom: "rapport trimestriel d'activité"
          }
        ],
        activitesAnnees: [2020, 2019],
        truc: [{ id: 'id-truc' }]
      })
      .mockResolvedValueOnce({})

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas).toEqual({
      types: [{ id: 'grp', nom: "rapport trimestriel d'activité" }],
      annees: [
        { id: 2020, nom: 2020 },
        { id: 2019, nom: 2019 }
      ]
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas).toEqual({
      types: [{ id: 'grp', nom: "rapport trimestriel d'activité" }],
      annees: [
        { id: 2020, nom: 2020 },
        { id: 2019, nom: 2019 }
      ]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasActivites.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test('obtient la liste des activités', async () => {
    const apiMock = api.activites.mockResolvedValueOnce({
      activites: ['activite-1', 'activite-2', 'activite-3'],
      total: 3
    })

    store.state.titresActivites.preferences.filtres.annees = [2020]
    await store.dispatch('titresActivites/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual([
      'activite-1',
      'activite-2',
      'activite-3'
    ])
    expect(store.state.titresActivites.total).toEqual(3)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.activites.mockResolvedValue(null)
    await store.dispatch('titresActivites/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.activites.mockRejectedValue('erreur api')
    await store.dispatch('titresActivites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { activitesTypeIds: 'grp' }
    await store.dispatch('titresActivites/preferencesSet', { section, params })

    expect(
      store.state.titresActivites.preferences.filtres.activitesTypeIds
    ).toEqual('grp')
  })
})
