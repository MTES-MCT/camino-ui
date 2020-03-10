import titresDemarches from './titres-demarches'
import * as api from '../api/titres-demarches'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  metasDemarches: jest.fn(),
  demarches: jest.fn()
}))

console.log = jest.fn()

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
      metas: {
        types: [],
        statuts: [],
        etapesTypes: [],
        titresTypes: [],
        titresDomaines: [],
        titresStatuts: []
      },
      params: {
        arrays: [
          'typesIds',
          'statutsIds',
          'titresDomainesIds',
          'titresTypesIds',
          'titresStatutsIds'
        ],
        strings: ['page', 'intervalle', 'colonne', 'ordre']
      },
      preferences: {
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: 'titreNom'
        },
        filtres: {
          typesIds: null,
          statutsIds: null,
          titresDomainesIds: null,
          titresTypesIds: null,
          titresStatutsIds: null,
          etapesIncluesIds: null,
          etapesExcluesIds: null
        }
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

  test('récupère les métas pour éditer une démarche', async () => {
    const data = {
      demarchesTypes: [{ id: 'id-demarchesTypes' }],
      demarchesStatuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      types: [{ id: 'id-types' }],
      domaines: [{ id: 'id-domaines' }],
      statuts: null
    }
    const apiMock = api.metasDemarches.mockResolvedValue(data)

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.metas).toEqual({
      types: [{ id: 'id-demarchesTypes' }],
      statuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      titresTypes: [{ id: 'id-types' }],
      titresDomaines: [{ id: 'id-domaines' }],
      titresStatuts: []
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasDemarches.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('obtient la liste des demarches', async () => {
    const apiMock = api.demarches.mockResolvedValue(demarchesListe)
    await store.dispatch('titresDemarches/get', {
      titresDomainesIds: 'c,w',
      titresStatutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      titresDomainesIds: ['c', 'w'],
      titresStatutsIds: ['val']
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titresDemarches.list).toEqual(demarchesListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.demarches.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titresDemarches/get', {
      titresDomainesIds: 'c,w',
      titresStatutsIds: 'val'
    })

    expect(apiMock).toHaveBeenCalledWith({
      titresDomainesIds: ['c', 'w'],
      titresStatutsIds: ['val']
    })
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { domainesIds: 'h' }
    await store.dispatch('titresDemarches/preferencesSet', { section, params })

    expect(store.state.titresDemarches.preferences.filtres.domainesIds).toEqual(
      'h'
    )
  })
})
