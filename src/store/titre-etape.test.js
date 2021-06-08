import titreEtape from './titre-etape'
import * as api from '../api/titres-etapes'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-etapes', () => ({
  etape: jest.fn(),
  etapeDeposer: jest.fn(),
  etapeSupprimer: jest.fn()
}))

console.info = jest.fn()

describe('étapes', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    titreEtape.state = {
      element: null
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

  test('retourne une étape', async () => {
    const apiMock = api.etape.mockResolvedValue({ id: 83, nom: 'marne' })
    await store.dispatch('titreEtape/get', 83)

    expect(apiMock).toHaveBeenCalledWith({ id: 83 })
    expect(store.state.titreEtape.element).toEqual({ id: 83, nom: 'marne' })
  })

  test("affiche une page d'erreur si l'id de l’étape retourne null", async () => {
    const apiMock = api.etape.mockResolvedValue(null)
    await store.dispatch('titreEtape/get', 27)

    expect(apiMock).toHaveBeenCalledWith({ id: 27 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur si de l'api ne répond pas lors d'une requête sur une étape", async () => {
    api.etape.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titreEtape/get', 83)

    expect(store.state.titreEtape.element).toEqual(null)
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('dépose une étape', async () => {
    const apiMock = api.etapeDeposer.mockResolvedValue(14)
    await store.dispatch('titreEtape/depose', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors du dépot d'une étape", async () => {
    const apiMock = api.etapeDeposer.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titreEtape/depose', 14)

    expect(apiMock).toHaveBeenCalledWith({ id: 14 })
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
