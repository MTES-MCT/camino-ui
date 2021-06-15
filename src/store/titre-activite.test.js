import titreActivite from './titre-activite'
import * as api from '../api/titres-activites'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/titres-activites', () => ({
  activiteSupprimer: jest.fn(),
  activiteDeposer: jest.fn(),
  activite: jest.fn()
}))
console.info = jest.fn()

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    titreActivite.state = { element: null, opened: false }

    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn(),
      pageError: jest.fn(),
      apiError: jest.fn()
    }

    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupLoad: jest.fn()
    }

    store = createStore({
      modules: {
        titreActivite,
        titre: {
          namespaced: true,
          state: { element: { id: 5 } },
          mutations: { open: jest.fn() }
        }
      },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test('retourne une activité', async () => {
    api.activite.mockResolvedValue({
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    await store.dispatch('titreActivite/get', 27)

    expect(store.state.titreActivite.element).toEqual({
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("affiche une page d'erreur si l'id de l'activité retourne null", async () => {
    const apiMock = api.activite.mockResolvedValue(null)
    await store.dispatch('titreActivite/get', 27)

    expect(apiMock).toHaveBeenCalledWith({ id: 27 })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api dans l'obtention de l'activité", async () => {
    const apiMock = api.activite.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titreActivite/get', 'activite-id')

    expect(apiMock).toHaveBeenCalledWith({ id: 'activite-id' })
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'activité", () => {
    store.commit('titreActivite/set', { id: 71, nom: 'toto' })
    store.commit('titreActivite/reset')

    expect(store.state.titreActivite.element).toBeNull()
  })

  test("ouvre et ferme l'activité", () => {
    store.commit('titreActivite/open')

    expect(store.state.titreActivite.opened).toBeTruthy()

    store.commit('titreActivite/open')

    expect(store.state.titreActivite.opened).toBeTruthy()

    store.commit('titreActivite/close')

    expect(store.state.titreActivite.opened).toBeFalsy()

    store.commit('titreActivite/close')

    expect(store.state.titreActivite.opened).toBeFalsy()
  })

  test("permute l'ouverture de l'activité", () => {
    expect(store.state.titreActivite.opened).toBeFalsy()
    store.commit('titreActivite/toggle')

    expect(store.state.titreActivite.opened).toBeTruthy()

    store.commit('titreActivite/toggle')

    expect(store.state.titreActivite.opened).toBeFalsy()
  })

  test('supprime une activité et redirige sur le titre', async () => {
    api.activiteSupprimer.mockResolvedValue({ id: 71 })
    await store.dispatch('titreActivite/remove', {
      id: 71,
      route: { name: 'titre', id: 'titre-id' }
    })

    expect(actions.reload).toHaveBeenCalledWith(expect.anything(), {
      name: 'titre',
      id: 'titre-id'
    })
    expect(api.activiteSupprimer).toHaveBeenCalled()
  })

  test('supprime une activité et redirige sur la liste des activités', async () => {
    api.activiteSupprimer.mockResolvedValue({ id: 71 })

    await store.dispatch('titreActivite/remove', {
      id: 71
    })

    expect(actions.reload).toHaveBeenCalledWith(expect.anything(), {
      name: 'activites'
    })

    expect(api.activiteSupprimer).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas lors de la suppression d'une activité", async () => {
    api.activiteSupprimer.mockRejectedValue(new Error("l'api ne répond pas"))
    await store.dispatch('titreActivite/remove', {
      id: 71
    })

    expect(api.activiteSupprimer).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('dépose une activité', async () => {
    api.activiteDeposer.mockResolvedValue({ id: 12 })

    await store.dispatch('titreActivite/depose', {
      id: 12,
      route: null
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test('dépose une activité retourne une erreur', async () => {
    api.activiteDeposer.mockRejectedValue(new Error("l'api ne répond pas"))

    await store.dispatch('titreActivite/depose', {
      id: 12,
      route: null
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })
})
