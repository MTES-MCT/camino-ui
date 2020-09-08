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
        { id: 'annees', type: 'numbers', elements: [] },
        { id: 'statutsIds', type: 'strings', elements: [] },
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
          annees: [],
          statutsIds: [],
          titresNoms: '',
          titresEntreprises: '',
          titresSubstances: '',
          titresReferences: '',
          titresTerritoires: '',
          titresTypesIds: [],
          titresDomainesIds: [],
          titresStatutsIds: []
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

  const activitesTypes = [
    {
      id: 'grp',
      nom: "rapport trimestriel d'activité"
    }
  ]
  const activitesAnnees = [2020, 2019]
  const activitesStatuts = [
    {
      id: 'abs',
      nom: 'absent',
      couleur: 'error'
    },
    {
      id: 'enc',
      nom: 'en construction',
      couleur: 'warning'
    },
    {
      id: 'dep',
      nom: 'déposé',
      couleur: 'success'
    },
    {
      id: 'fer',
      nom: 'cloturé',
      couleur: 'neutral'
    }
  ]
  const domaines = [
    {
      id: 'm',
      nom: 'minéraux et métaux'
    },
    {
      id: 'w',
      nom: 'granulats marins'
    }
  ]
  const statuts = [
    {
      id: 'val',
      nom: 'valide',
      couleur: 'success'
    },
    {
      id: 'ech',
      nom: 'échu',
      couleur: 'neutral'
    }
  ]
  const types = [
    {
      id: 'cx',
      nom: 'concession',
      exploitation: true
    },
    {
      id: 'pr',
      nom: 'permis exclusif de recherches',
      exploitation: false
    }
  ]

  test('récupère les métas pour afficher les activités', async () => {
    const apiMock = api.metasActivites
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
    const apiMock = api.metasActivites.mockRejectedValue(
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

    store.state.titresActivites.preferences.filtres.annees = [2020]
    await store.dispatch('titresActivites/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual(response.elements)
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
