import titreActivites from './titre-activites'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../api', () => ({
  titreActiviteUpdate: jest.fn()
}))

describe("update des activités d'un titre", () => {
  let store
  let activite
  let mutations
  let actions
  let actionsTitre
  let titre
  beforeEach(() => {
    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn()
    }
    actions = {
      messageAdd: jest.fn()
    }
    actionsTitre = { reload: jest.fn() }
    activite = { id: 27, contenu: [], statut: { id: 28 } }
    titreActivites.state = {}
    titre = { namespaced: true, actions: actionsTitre }
    store = new Vuex.Store({
      modules: { titreActivites, titre },
      mutations,
      actions
    })
  })

  test("affiche l'activite selectionnee", async () => {
    const apiMock = api.titreActiviteUpdate.mockResolvedValue({
      confirmation: true
    })
    await store.dispatch('titreActivites/update', activite)

    expect(mutations.popupMessagesRemove).toHaveBeenCalled()
    expect(mutations.loadingAdd).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 28 }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(actionsTitre.reload).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("n'affiche pas l'activite", async () => {
    const apiMock = api.titreActiviteUpdate.mockResolvedValue(null)
    await store.dispatch('titreActivites/update', activite)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 28 }
    })
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("erreur dans l'api", async () => {
    const apiMock = api.titreActiviteUpdate.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titreActivites/update', activite)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      activite: { id: 27, contenu: [], activiteStatutId: 28 }
    })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })
})
