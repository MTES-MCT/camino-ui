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
      apiError: jest.fn(),
      pageError: jest.fn()
    }
    store = new Vuex.Store({
      modules: { stats },
      mutations,
      actions
    })
  })

  test('récupere les statistiques et les affichent dans la page', async () => {
    const apiMock = api.stats.mockResolvedValue(statsReturned)
    await store.dispatch('stats/get')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).not.toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.stats.loaded).toBeTruthy()
  })

  test("retourne une erreur de l'api lors de l'obtention des stats", async () => {
    const apiMock = api.stats.mockResolvedValue(null)
    await store.dispatch('stats/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.stats.loaded).toBeFalsy()
  })

  test("retourne une erreur de l'api lors de l'obtention des stats", async () => {
    const apiMock = api.stats.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('stats/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.pageError).not.toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.stats.loaded).toBeFalsy()
  })

  test("met à jour les statistiques si l'api ne renvoie rien", async () => {
    await store.commit('stats/set', {})

    expect(store.state.stats.titreActivites2018Ratio).toEqual(0)
    expect(store.state.stats.loaded).toBeTruthy()
  })
})
