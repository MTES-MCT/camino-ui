import statistiques from './statistiques'
import * as api from '../api/statistiques'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/statistiques', () => ({
  statistiques: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état de la page de statistiques', () => {
  let actions
  let mutations
  let store
  let statistiquesReturned
  beforeEach(() => {
    statistiquesReturned = {
      titresTotal: 30,
      titresValide: 20,
      titresActivitesDepose: 10,
      titreActivites2018Ratio: 50,
      titresActivitesBeneficesEntreprise: 4800,
      titresActivitesBeneficesAdministration: 2400,
      loaded: true
    }
    statistiques.state = {
      titresTotal: 0,
      titresValide: 0,
      titresActivitesDepose: 0,
      titreActivites2018Ratio: 0,
      titresActivitesBeneficesEntreprise: 0,
      titresActivitesBeneficesAdministration: 0,
      loaded: false
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = {
      apiError: jest.fn()
    }
    store = new Vuex.Store({
      modules: { statistiques },
      mutations,
      actions
    })
  })

  test('récupère les statistiques et les affiche dans la page', async () => {
    const apiMock = api.statistiques.mockResolvedValue(statistiquesReturned)
    await store.dispatch('statistiques/get')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.statistiques.titreActivites2018Ratio).toEqual(50)
    expect(store.state.statistiques.loaded).toBeTruthy()
  })

  test("charge la page si l'api répond", async () => {
    const apiMock = api.statistiques.mockResolvedValue(null)
    await store.dispatch('statistiques/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.statistiques.titreActivites2018Ratio).toEqual(0)
    expect(store.state.statistiques.loaded).toBeTruthy()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.statistiques.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('statistiques/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.statistiques.loaded).toBeFalsy()
  })
})
