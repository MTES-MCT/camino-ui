import statistiques from './statistiques'
import * as api from '../api/statistiques'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/statistiques', () => ({
  statistiques: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('page de statistiques', () => {
  let actions
  let mutations
  let store
  let statistiquesReturned
  beforeEach(() => {
    statistiquesReturned = {
      statistiquesGlobales: {
        titresActivitesBeneficesEntreprise: 4800,
        titresActivitesBeneficesAdministration: 2400,
        nbSearchArray: [],
        nbMajTitresArray: [],
        nbAction: 60,
        timeSession: '14min',
        nbDonwload: 110,
        nbDemarche: 400,
        nbErreur: 210,
        loaded: true
      },
      statistiquesGuyane: {}
    }
    statistiques.state = {
      statistiquesGlobales: {
        titresActivitesBeneficesEntreprise: 0,
        titresActivitesBeneficesAdministration: 0,
        nbSearchArray: [],
        nbMajTitresArray: [],
        nbAction: 0,
        timeSession: '',
        nbDonwload: 0,
        nbDemarche: 0,
        nbErreur: 0,
        loaded: false
      },
      statistiquesGuyane: {}
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
    expect(
      store.state.statistiques.statistiquesGlobales
        .titresActivitesBeneficesEntreprise
    ).toEqual(4800)
    expect(store.state.statistiques.statistiquesGlobales.loaded).toBeTruthy()
  })

  test("charge la page si l'api répond", async () => {
    const apiMock = api.statistiques.mockResolvedValue(null)
    await store.dispatch('statistiques/get')

    expect(apiMock).toHaveBeenCalled()
    expect(
      store.state.statistiques.statistiquesGlobales
        .titresActivitesBeneficesEntreprise
    ).toEqual(0)
    expect(store.state.statistiques.statistiquesGlobales.loaded).toBeFalsy()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.statistiques.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('statistiques/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.statistiques.loaded).toBeFalsy()
  })
})
