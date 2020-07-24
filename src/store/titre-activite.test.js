import titreActivite from './titre-activite'
import * as api from '../api/titres-activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-activites', () => ({
  activiteModifier: jest.fn(),
  activite: jest.fn()
}))
console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    titreActivite.state = { current: null }

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

    store = new Vuex.Store({
      modules: { titreActivite },
      mutations,
      actions,
      state: { titre: { current: { id: 5 } } }
    })
  })

  test('valide une activité', async () => {
    api.activiteModifier.mockResolvedValue({ statut: { id: 'dep' } })

    await store.dispatch('titreActivite/update', {
      activite: {
        id: 27,
        contenu: [],
        statut: { id: 'dep' }
      },
      context: null
    })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalledTimes(1)
  })

  test('valide une activité sur une activité', async () => {
    api.activiteModifier.mockResolvedValue({ statut: { id: 'dep' } })
    titreActivite.state.current = { id: 'activite-id' }

    await store.dispatch('titreActivite/update', {
      activite: {
        id: 27,
        contenu: [],
        statut: { id: 'dep' }
      },
      context: 'activite'
    })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalledTimes(1)
    expect(actions.reload).toHaveBeenCalledTimes(1)
  })

  test('enregistre une activité pour un titre', async () => {
    api.activiteModifier.mockResolvedValue({ statut: { id: 'enc' } })

    await store.dispatch('titreActivite/update', {
      activite: {
        id: 27,
        contenu: [],
        statut: { id: 'enc' }
      },
      context: 'titre'
    })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(actions.reload).toHaveBeenCalled()
  })

  test("erreur dans l'api lors de l'enregistrement d'une activité", async () => {
    const apiMock = api.activiteModifier.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titreActivite/update', {
      activite: {
        id: 27,
        contenu: [],
        statut: { id: 'dep' }
      },
      context: 'titre'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], statutId: 'dep' }
    })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('retourne une activité', async () => {
    api.activite.mockResolvedValue({
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    await store.dispatch('titreActivite/get', 27)

    expect(store.state.titreActivite.current).toEqual({
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

    expect(store.state.titreActivite.current).toBeNull()
  })
})
