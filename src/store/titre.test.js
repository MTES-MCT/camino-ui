import titre from './titre'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as routerApi from '../router'

jest.mock('../router', () => ({ router: [] }))

jest.mock('../api', () => ({
  titre: jest.fn(),
  titreUpdate: jest.fn(),
  titreRemove: jest.fn(),
  titreDemarcheUpdate: jest.fn(),
  titreDemarcheRemove: jest.fn(),
  titreEtapeUpdate: jest.fn(),
  titreEtapeRemove: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe('teste les actions', () => {
  let store
  let titreId
  let documentId
  let actions
  let mutations
  let titreInfo
  beforeEach(() => {
    titreInfo = { id: 83, nom: 'marne' }
    titreId = 83
    documentId = 62
    titre.state = {
      current: null,
      documents: []
    }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessagesAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { titre },
      actions,
      mutations
    })
  })

  test('obtient le titre en cours', async () => {
    const apiMock = api.titre.mockResolvedValue(titreInfo)
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(titreInfo)
  })

  test('le titre en cours ne peut etre affiché', async () => {
    const apiMock = api.titre.mockResolvedValue(null)
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api lors de l'obtention du titre", async () => {
    const apiMock = api.titre.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/get', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(titreId)
    expect(store.state.titre.current).toEqual(null)
    expect(actions.apiError).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('reload le titre en cours', async () => {
    store.state.titre.current = titreInfo
    api.titre.mockResolvedValue(titreInfo)
    await store.dispatch('titre/reload')

    expect(actions.messageAdd).toHaveBeenCalled()
    expect(console.log).not.toHaveBeenCalled()
  })

  test("echec de l'api dans le reload du titre en cours", async () => {
    store.state.titre.current = titreInfo
    api.titre.mockRejectedValue(new Error("erreur de l'api"))
    await store.dispatch('titre/reload')

    expect(actions.messageAdd).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('met à jour le titre', async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(router).toEqual([{ name: 'titre', params: { id: titreId } }])
  })

  test('cree le titre', async () => {
    const creation = false
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.reload).toHaveBeenCalled()
  })

  test('le titre ne peut etre mis à jour', async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(null)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupMessagesAdd).toHaveBeenCalled()
  })

  test("erreur de l'api dans la mise à jour du titre", async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("erreur de l'api dans la mise à jour du titre", async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test('On ajoute le document', () => {
    const selected = true
    store.dispatch('titre/documentSelect', { documentId, selected })

    expect(store.state.titre.documents).toEqual([documentId])
  })

  test('On supprime le document', () => {
    const selected = false
    store.commit('titre/documentSelectionAdd', documentId)
    expect(store.state.titre.documents).toEqual([documentId])
    store.dispatch('titre/documentSelect', { documentId, selected })

    expect(store.state.titre.documents).toEqual([])
  })
})

describe('tests sur getters', () => {
  test('documentsTotal: current state is null', () => {
    const state = {
      current: null,
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(0)
  })
  test('documentsTotal: pas de demarches', () => {
    const state = {
      current: { démarches: null },
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(0)
  })
  test('documentsTotal: obtient le nombre de documents exact', () => {
    const state = {
      current: {
        démarches: {
          m: [{ documents: [1, 2, 3] }],
          h: [{ documents: [] }],
          w: []
        }
      },
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(3)
  })

  test('documentSelected: fonctionne correctement', () => {
    const state = {
      current: null,
      documents: [12]
    }
    const result = titre.getters.documentSelected(state)(12)
    expect(result).toBeDefined()
  })
  test('documentSelected: pas de resultats dans les documents', () => {
    const state = {
      current: null,
      documents: [12]
    }
    const result = titre.getters.documentSelected(state)(11)
    expect(result).toBeUndefined()
  })
})

describe('teste les mutations liées à un titre', () => {
  let store
  let titreId
  let documentId
  beforeEach(() => {
    titreId = 83
    documentId = 62
    titre.state = {
      current: null,
      documents: [12, 54, 213]
    }
    store = new Vuex.Store({
      modules: { titre }
    })
  })

  test('met à jour le titre', () => {
    store.commit('titre/set', titreId)

    expect(store.state.titre.current).toEqual(83)
  })

  test("reset l'utilisateur courant", () => {
    store.commit('titre/set', titreId)
    store.commit('titre/reset')

    expect(store.state.titre.current).toBeNull()
  })

  test("ajout d'un document", () => {
    store.commit('titre/documentSelectionAdd', documentId)

    expect(store.state.titre.documents).toEqual([12, 54, 213, 62])
  })

  test('on enleve un utilisateur qui se trouve dans la liste', () => {
    store.commit('titre/documentSelectionRemove', 54)

    expect(store.state.titre.documents).toEqual([12, 213])
  })

  test('on enleve un utilisateur inexistant', () => {
    store.commit('titre/documentSelectionRemove', 99)

    expect(store.state.titre.documents).toEqual([12, 54, 213])
  })
})
