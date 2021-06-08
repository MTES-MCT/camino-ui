import titreEtape from './titre-etape'
import * as api from '../api/titres-etapes'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import {
  titreEtapeMetas,
  titreEtapeMetasRes,
  titreEtapeMetasRes2,
  titreEtapeEdition,
  titreEtapeHeritage1,
  titreEtapeHeritageRes1,
  titreEtapeHeritageRes2,
  titreEtapeHeritage2,
  titreEtapeEtapesTypes
} from './__mocks__/titre-etape'

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
    titreEtape.state = {
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
        titreEtape,
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
      etape: {
        id: 'etape-id',
        titreDemarcheId: 'demarche-id',
        date: '2020-01-01',
        modification: true
      }
    })

    await store.dispatch('titreEtape/init', {
      id: 'etape-id',
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(apiMockEtape).toHaveBeenCalled()
    expect(apiMockEtapesTypes).toHaveBeenCalled()
    expect(store.state.titreEtape.metas).toEqual(titreEtapeMetasRes)
    expect(store.state.titreEtape.element).toEqual(titreEtapeEdition)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si on n'a pas les droits", async () => {
    const apiMockEtape = api.etape.mockResolvedValue({
      id: 'etape-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-01'
    })

    await store.dispatch('titreEtape/init', {
      id: 'etape-id',
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockEtape).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })

  test('récupère les métas pour créer une étape', async () => {
    const apiMockMetas = api.titreEtapeMetas.mockResolvedValue(titreEtapeMetas)

    await store.dispatch('titreEtape/init', {
      titreDemarcheId: 'demarche-id'
    })

    expect(apiMockMetas).toHaveBeenCalled()
    expect(store.state.titreEtape.metas).toEqual(titreEtapeMetasRes2)
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.titreEtapeMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titreEtape/init', { etape: {} })

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("récupère l'héritage d'une étape", async () => {
    store.state.titreEtape.element = {
      id: 'etape-id',
      typeId: 'etape-type-id',
      incertitudes: {},
      date: '2020-01-02',
      titreDemarcheId: 'demarche-id'
    }

    store.state.titreEtape.metas.demarche = { id: 'demarche-id' }

    const apiMock1 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id'
    })

    expect(apiMock1).toHaveBeenCalled()
    expect(store.state.titreEtape.element).toEqual(titreEtapeHeritage1)

    const apiMock2 = api.etapeHeritage.mockResolvedValue(titreEtapeHeritageRes1)
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id'
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

    const apiMock3 = api.etapeHeritage.mockResolvedValue({
      etapeHeritage: {
        type: { id: 'new-etape-type-id' }
      }
    })
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
      typeId: 'new-etape-type-id'
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

  test("retourne une erreur si l'API retourne une erreur lors de la récupération de l'héritage", async () => {
    api.etapeHeritage.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtape/heritageGet', {
      typeId: 'etape-type-id',
      titreDemarcheId: 'demarche-id',
      date: '2020-01-02'
    })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test('créé une étape', async () => {
    store.state.titreEtape.metas.demarche = { id: 'demarche-id' }
    api.etapeCreer.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/upsert', {
      etape: {
        nom: 'champs',
        incertitudes: {}
      }
    })

    store.commit('titreEtape/reset')

    expect(store.state.titreEtape.element).toBeNull()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la création d'une étape", async () => {
    api.etapeCreer.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titreEtape/upsert', {
      nom: 'champs',
      incertitudes: {}
    })

    expect(actions.apiError).toHaveBeenCalled()
  })

  test('met à jour une étape', async () => {
    store.state.titreEtape.metas.demarche = { id: 'demarche-id' }
    api.etapeModifier.mockResolvedValue({ id: 14, nom: 'champs' })
    await store.dispatch('titreEtape/upsert', {
      etape: {
        id: 14,
        nom: 'champs',
        incertitudes: {}
      }
    })
  })

  test("retourne une erreur si l'API retourne une erreur lors de la mise à jour d'une étape", async () => {
    api.etapeModifier.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreEtape/upsert', {
      etape: {
        id: 14,
        nom: 'champs',
        incertitudes: {}
      }
    })

    expect(actions.apiError).toHaveBeenCalled()
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

  test('formatte une étape en édition', () => {
    store.state.titreEtape = {
      element: {
        id: 'titre-etape-id',
        typeId: 'etape-type-id',
        duree: null,
        substances: [{ id: 'substance-id' }],
        titulaires: [{ id: 'entreprise-id-1' }],
        amodiataires: [{ id: 'entreprise-id-2' }]
      },

      metas: {
        etapesTypes: [{ id: 'etape-type-id' }],
        substances: [{ id: 'substance-id' }],
        entreprises: [{ id: 'entreprise-id-1' }, { id: 'entreprise-id-2' }]
      }
    }
    expect(store.getters['titreEtape/etapeEditFormatted']).toEqual({
      id: 'titre-etape-id',
      modification: false,
      incertitudes: undefined,
      type: { id: 'etape-type-id' },
      substances: [{ id: 'substance-id' }],
      titulaires: [{ id: 'entreprise-id-1' }],
      amodiataires: [{ id: 'entreprise-id-2' }]
    })
  })
})
