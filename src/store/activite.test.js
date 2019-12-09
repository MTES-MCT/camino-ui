import activite from './activite'
import * as api from '../api/activites'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api/activites', () => ({
  activiteModifier: jest.fn(),
  activite: jest.fn()
}))

describe("état d'une activité", () => {
  let store
  let mutations
  let actions

  beforeEach(() => {
    actions = {
      reload: jest.fn(),
      messageAdd: jest.fn()
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
      modules: { activite },
      mutations,
      actions,
      state: { titre: { current: { id: 5 } } }
    })
  })

  test('valide une activité pour un titre', async () => {
    const apiMock = api.activiteModifier.mockResolvedValue({
      statut: { id: 'dep' }
    })

    await store.dispatch('activite/update', {
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(mutations.popupMessagesRemove).toHaveBeenCalled()
    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 'dep' }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalledTimes(2)
    expect(actions.reload).toHaveBeenCalled()
  })

  test('enregistre une activité pour un titre', async () => {
    api.activiteModifier.mockResolvedValue({
      statut: { id: 'enc' }
    })
    await store.dispatch('activite/update', {
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(mutations.popupClose).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalledTimes(2)
    expect(actions.reload).toHaveBeenCalled()
  })

  test("n'enregistre pas une activité si l'API retourne null", async () => {
    const apiMock = api.activiteModifier.mockResolvedValue(null)
    await store.dispatch('activite/update', {
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 'dep' }
    })
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("erreur dans l'api lors de l'enregistrement d'une activité", async () => {
    const apiMock = api.activiteModifier.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('activite/update', {
      id: 27,
      contenu: [],
      statut: { id: 'dep' }
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 'dep' }
    })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
