import statistiques from './statistiques'
import * as api from '../api/statistiques'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/statistiques', () => ({
  statistiquesGlobales: jest.fn(),
  statistiquesGuyane: jest.fn(),
  statistiquesGranulatsMarins: jest.fn()
}))

console.info = jest.fn()

describe('page de statistiques', () => {
  let actions
  let mutations
  let store
  let statistiquesGlobales
  let statistiquesGuyane
  let statistiquesGranulatsMarins

  beforeEach(() => {
    statistiquesGlobales = {
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
    }

    statistiquesGuyane = {
      exemple: 'truc'
    }

    statistiquesGranulatsMarins = {
      annees: [
        {
          StatistiquesGranulatsMarinsAnnee:
            'StatistiquesGranulatsMarinsAnnee2006'
        }
      ],
      surfaceExploration: 86383,
      surfaceExploitation: 20454,
      titresInstructionExploration: 0,
      titresValPrw: 2,
      titresInstructionExploitation: 2,
      titresValCxw: 21
    }

    statistiques.state = {
      globales: {},
      guyane: {},
      granulatsMarins: {}
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = {
      apiError: jest.fn()
    }
    store = createStore({
      modules: { statistiques },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les statistiques globales', async () => {
    const apiMock =
      api.statistiquesGlobales.mockResolvedValue(statistiquesGlobales)
    await store.dispatch('statistiques/get', 'globales')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.statistiques.globales).toEqual(statistiquesGlobales)
  })

  test('récupère les statistiques de guyane', async () => {
    const apiMock = api.statistiquesGuyane.mockResolvedValue(statistiquesGuyane)
    await store.dispatch('statistiques/get', 'guyane')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.statistiques.guyane).toEqual(statistiquesGuyane)

    await store.dispatch('statistiques/get', 'pour avoir 100% de coverage')
  })

  test('récupère les statistiques sur les granulats marins', async () => {
    const apiMock = api.statistiquesGranulatsMarins.mockResolvedValue(
      statistiquesGranulatsMarins
    )
    await store.dispatch('statistiques/get', 'granulatsMarins')

    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(store.state.statistiques.granulatsMarins).toEqual(
      statistiquesGranulatsMarins
    )

    await store.dispatch('statistiques/get', 'pour avoir 100% de coverage')
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.statistiquesGlobales.mockRejectedValue(
      new Error('erreur api')
    )
    await store.dispatch('statistiques/get', 'globales')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
    expect(store.state.statistiques.loaded).toBeFalsy()
  })
})
