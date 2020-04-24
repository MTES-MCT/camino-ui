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
  let activitesListe

  beforeEach(() => {
    activitesListe = ['activite-1', 'activite-2', 'activite-3']
    titresActivites.state = {
      list: [],
      total: null,
      metas: {
        activitesTypes: [],
        activitesAnnees: []
      },
      params: [
        { id: 'typesIds', type: 'array', elements: [] },
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
    const apiMock = api.metasActivites.mockResolvedValueOnce({
      activitesTypes: [
        {
          id: 'grp',
          nom: "rapport trimestriel d'activité"
        }
      ],
      activitesAnnees: [2020, 2019]
    })

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas.types).toEqual([
      { id: 'grp', nom: "rapport trimestriel d'activité" }
    ])
    expect(store.state.titresActivites.metas.annees).toEqual([
      { id: 2020, nom: 2020 },
      { id: 2019, nom: 2019 }
    ])
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
    const apiMock = api.activites.mockResolvedValue({
      activites: activitesListe
    })

    await store.dispatch('titresActivites/get', {
      typesIds: ['wrp'],
      annees: [2019]
    })

    expect(apiMock).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual(activitesListe)
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
