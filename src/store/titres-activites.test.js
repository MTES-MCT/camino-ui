import titresActivites from './titres-activites'
import * as api from '../api/titres-activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-activites', () => ({
  metasActivites: jest.fn(),
  activites: jest.fn()
}))

console.log = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    titresActivites.state = {
      list: [],
      metas: {
        activitesTypes: []
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
      .mockResolvedValueOnce([
        { id: 'grp', nom: "rapport trimestriel d'activité" }
      ])
      .mockResolvedValueOnce(null)

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas.activitesTypes).toEqual([
      { id: 'grp', nom: "rapport trimestriel d'activité" }
    ])
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titresActivites/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.metas.activitesTypes).toEqual([])
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
    const response = [{ id: 'activite-id', nom: 'activite-nom' }]
    const apiMock = api.activites.mockResolvedValue(response)
    await store.dispatch('titresActivites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual(response)
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.activites.mockResolvedValue(null)
    await store.dispatch('titresActivites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresActivites.list).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.activites.mockRejectedValue('erreur api')
    await store.dispatch('titresActivites/get', { annee: 2018, typeId: 'grp' })

    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })
})
