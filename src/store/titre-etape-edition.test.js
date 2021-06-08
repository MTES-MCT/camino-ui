import titreEtapeEdition from './titre-etape-edition'
import * as api from '../api/titres-etapes'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeMetasRes2,
  titreEtapeEdited,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1,
  titreEtapeHeritageRes2,
  titreEtapeHeritage2,
  titreEtapeEtapesTypes
} from './__mocks__/titre-etape'
import router from '../router'

jest.mock('../router', () => ({
  push: jest.fn()
}))

jest.mock('../api/titres-etapes', () => ({
  etape: jest.fn(),
  etapeHeritage: jest.fn(),
  titreEtapeMetas: jest.fn(),
  titreEtapeEtapesTypes: jest.fn(),
  etapeCreer: jest.fn(),
  etapeModifier: jest.fn(),
  etapeSupprimer: jest.fn()
}))

console.info = jest.fn()

describe('étapes', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titreEtapeEdition.state = {
      element: null,
      metas: {
        demarche: null,
        etapesTypes: [],
        devises: [],
        unites: [],
        geoSystemes: [],
        substances: [],
        entreprises: []
      },
      heritageLoaded: false,
      loaded: false
    }

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      apiError: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn()
    }

    store = createStore({
      actions,
      mutations,
      modules: {
        titreEtapeEdition,
        titre: { namespaced: true, mutations: { open: jest.fn() } }
      }
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les métas pour éditer une étape', async () => {
    const apiMockMetas = api.titreEtapeMetas.mockResolvedValue(titreEtapeMetas)
    const apiMockEtapesTypes = api.titreEtapeEtapesTypes.mockResolvedValue(
      titreEtapeEtapesTypes
    )
    const apiMockEtape = api.etape.mockResolvedValue({
      id: 'etape-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-01',
      modification: true
    })

    await store.dispatch('titreEtapeEdition/init', {
      id: 'etape-id',
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(apiMockEtape).toHaveBeenCalled()
    expect(apiMockEtapesTypes).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.metas).toEqual(titreEtapeMetasRes)
    expect(store.state.titreEtapeEdition.element).toEqual(titreEtapeEdited)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si on n'a pas les droits", async () => {
    const apiMockEtape = api.etape.mockResolvedValue({
      id: 'etape-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-01'
    })

    await store.dispatch('titreEtapeEdition/init', {
      id: 'etape-id',
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockEtape).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })

  test('récupère les métas pour créer une étape', async () => {
    const apiMockMetas = api.titreEtapeMetas.mockResolvedValue(titreEtapeMetas)

    await store.dispatch('titreEtapeEdition/init', {
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.metas).toEqual(titreEtapeMetasRes2)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titreEtapeMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreEtapeEdition/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("récupère l'héritage d'une étape", async () => {
    store.state.titreEtapeEdition.element = {
      id: 'etape-id',
      typeId: 'etape-type-id',
      incertitudes: {},
      date: '2020-01-02',
      titreDemarcheId: 'demarche-id'
    }

    store.state.titreEtapeEdition.metas.demarche = { id: 'demarche-id' }

    const apiMock1 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtapeEdition/heritageGet', {
      typeId: 'etape-type-id'
    })

    expect(apiMock1).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.element).toEqual(titreEtapeHeritage1)

    const apiMock2 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtapeEdition/heritageGet', {
      typeId: 'etape-type-id'
    })

    expect(apiMock2).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.element).toEqual(titreEtapeHeritage1)

    store.state.titreEtapeEdition.element = {
      date: '2020-01-01',
      typeId: 'etape-type-id',
      incertitudes: {},
      titreDemarcheId: 'demarche-id',
      heritageProps: {}
    }

    const apiMock3 = api.etapeHeritage.mockResolvedValue({
      type: { id: 'new-etape-type-id' }
    })
    await store.dispatch('titreEtapeEdition/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock3).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.element).toEqual({
      date: '2020-01-01',
      incertitudes: { date: undefined },
      statutId: '',
      titreDemarcheId: 'demarche-id',
      typeId: 'new-etape-type-id'
    })

    const apiMock4 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes2)
    await store.dispatch('titreEtapeEdition/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock4).toHaveBeenCalled()
    expect(store.state.titreEtapeEdition.element).toEqual(titreEtapeHeritage2)
  })

  test("retourne une erreur si l'API retourne une erreur lors de la récupération de l'héritage", async () => {
    api.etapeHeritage.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtapeEdition/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test('créé une étape', async () => {
    store.state.titreEtapeEdition.metas.demarche = { id: 'demarche-id' }
    api.etapeCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtapeEdition/upsert', {
      etape: {
        nom: 'champs',
        incertitudes: {}
      }
    })

    expect(router.push).toHaveBeenCalled()

    store.commit('titreEtapeEdition/reset')

    expect(store.state.titreEtapeEdition.element).toBeNull()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.etapeCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtapeEdition/upsert', {
      nom: 'champs',
      incertitudes: {}
    })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    store.state.titreEtapeEdition.metas.demarche = { id: 'demarche-id' }
    api.etapeModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtapeEdition/upsert', {
      etape: {
        id: 14,
        nom: 'champs',
        incertitudes: {}
      }
    })

    expect(router.push).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une étape", async () => {
    api.etapeModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreEtapeEdition/upsert', {
      etape: {
        id: 14,
        nom: 'champs',
        incertitudes: {}
      }
    })

    expect(actions.apiError).toHaveBeenCalled()
  })
})
