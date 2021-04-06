import titreEtape from './titre-etape'
import * as api from '../api/titres-etapes'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeEdition,
  titreEtapeCreation,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1,
  titreEtapeHeritageRes2,
  titreEtapeHeritage2
} from './__mocks__/titre-etape'

jest.mock('../api/titres-etapes', () => ({
  etape: jest.fn(),
  etapeHeritage: jest.fn(),
  titreEtapeMetas: jest.fn(),
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
    titreEtape.state = {
      element: null,
      metas: {
        etapesTypes: [],
        devises: [],
        unites: [],
        geoSystemes: [],
        substances: [],
        entreprises: []
      }
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
        titreEtape,
        titre: { namespaced: true, mutations: { open: jest.fn() } }
      }
    })

    const app = createApp({})
    app.use(store)
  })

  test('récupère les métas pour éditer une étape', async () => {
    const apiMockMetas = api.titreEtapeMetas.mockResolvedValue(titreEtapeMetas)
    const apiMockEtape = api.etape.mockResolvedValue({
      id: 'etape-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-01'
    })

    await store.dispatch('titreEtape/init', {
      id: 'etape-id',
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(apiMockEtape).toHaveBeenCalled()
    expect(store.state.titreEtape.metas).toEqual(titreEtapeMetasRes)
    expect(store.state.titreEtape.element).toEqual(titreEtapeEdition)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test('récupère les métas pour créer une étape', async () => {
    const apiMockMetas = api.titreEtapeMetas.mockResolvedValue(titreEtapeMetas)

    await store.dispatch('titreEtape/init', {
      titreDemarcheId: 'demarche-id',
      date: '2020-01-01'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(store.state.titreEtape.metas).toEqual(titreEtapeMetasRes)
    expect(store.state.titreEtape.element).toEqual(titreEtapeCreation)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titreEtapeMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreEtape/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("récupère l'héritage d'une étape", async () => {
    store.state.titreEtape.element = {
      typeId: 'etape-type-id',
      incertitudes: {},
      titreDemarcheId: 'demarche-id'
    }
    const apiMock1 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock1).toHaveBeenCalled()
    expect(store.state.titreEtape.element).toEqual(titreEtapeHeritage1)

    const apiMock2 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock2).toHaveBeenCalled()
    expect(store.state.titreEtape.element).toEqual(titreEtapeHeritage1)

    store.state.titreEtape.element = {
      date: '2020-01-01',
      typeId: 'etape-type-id',
      incertitudes: {},
      titreDemarcheId: 'demarche-id',
      heritageProps: {}
    }

    const apiMock3 = api.etapeHeritage.mockResolvedValue({})
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock3).toHaveBeenCalled()
    expect(store.state.titreEtape.element).toEqual({
      date: '2020-01-01',
      incertitudes: { date: undefined },
      statutId: '',
      titreDemarcheId: 'demarche-id',
      typeId: 'etape-type-id'
    })

    const apiMock4 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes2)
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(apiMock4).toHaveBeenCalled()
    expect(store.state.titreEtape.element).toEqual(titreEtapeHeritage2)
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.etapeHeritage.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('créé une étape', async () => {
    api.etapeCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/upsert', {
      nom: 'champs',
      incertitudes: {}
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.etapeCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtape/upsert', {
      nom: 'champs',
      incertitudes: {}
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    api.etapeModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/upsert', {
      id: 14,
      nom: 'champs',
      incertitudes: {}
    })

    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une étape", async () => {
    api.etapeModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreEtape/upsert', {
      id: 14,
      nom: 'champs',
      incertitudes: {}
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime une étape', async () => {
    const apiMock = api.etapeSupprimer.mockResolvedValue(14)
    await store.dispatch('titreEtape/remove', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la suppression d'une étape", async () => {
    const apiMock = api.etapeSupprimer.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titreEtape/remove', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
