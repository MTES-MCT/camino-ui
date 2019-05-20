import stats from './stats'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api', () => ({
  stats: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('état de la page de stats', () => {
  let actions
  let mutations
  let store
  let statsReturned
  beforeEach(() => {
    statsReturned = {
      titresTotal: 30,
      titresValide: 20,
      titresActivites2018Depose: 10,
      titreActivites2018Ratio: 50,
      titresActivites2018BeneficesEntreprise: 4800,
      titresActivites2018BeneficesAdministration: 2400,
      loaded: true
    }
    stats.state = {
      titresTotal: 0,
      titresValide: 0,
      titresActivites2018Depose: 0,
      titreActivites2018Ratio: 0,
      titresActivites2018BeneficesEntreprise: 0,
      titresActivites2018BeneficesAdministration: 0,
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
      modules: { stats },
      mutations,
      actions
    })
  })

  test('récupère les statistiques et les affiche dans la page', async () => {
    const apiMock = api.stats.mockResolvedValue(statsReturned)
    await store.dispatch('stats/get')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.stats.titreActivites2018Ratio).toEqual(50)
    expect(store.state.stats.loaded).toBeTruthy()
  })

  test("charge la page si l'api répond", async () => {
    const apiMock = api.stats.mockResolvedValue(null)
    await store.dispatch('stats/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.stats.titreActivites2018Ratio).toEqual(0)
    expect(store.state.stats.loaded).toBeTruthy()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.stats.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('stats/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.stats.loaded).toBeFalsy()
  })
})
