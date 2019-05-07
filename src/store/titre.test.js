import titre from './titre'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as router from '../router'

jest.mock('../router', () => [])

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
  let demarcheId
  let demarcheInfo
  let etapeId
  let etapeInfo
  beforeEach(() => {
    titreInfo = { id: 83, nom: 'marne' }
    titreId = 83
    demarcheInfo = { id: 52, nom: 'val' }
    demarcheId = 52
    etapeInfo = { id: 14, nom: 'champs' }
    etapeId = 14
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
      popupMessageAdd: jest.fn()
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
    const actionGet = jest.fn().mockRejectedValue(new Error("echech de l'api"))
    titre.actions.get = actionGet
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    await store.dispatch('titre/reload')

    expect(console.log).toHaveBeenCalled()
  })

  test('cree le titre', async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(router.default).toEqual([{ name: 'titre', params: { id: titreId } }])
  })

  test('met à jour le titre', async () => {
    const creation = false
    const actionReload = jest.fn()
    titre.actions.reload = actionReload
    store = new Vuex.Store({ modules: { titre }, actions, mutations })
    const apiMock = api.titreUpdate.mockResolvedValue(titreInfo)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actionReload).toHaveBeenCalled()
  })

  test('le titre ne peut etre mis à jour', async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockResolvedValue(null)
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api dans la mise à jour du titre", async () => {
    const creation = true
    const apiMock = api.titreUpdate.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('titre/titreUpdate', { titre: titreInfo, creation })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ titre: titreInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("suppression d'un titre", async () => {
    const apiMock = api.titreRemove.mockResolvedValue(true)
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(router.default).toEqual([
      { name: 'titre', params: { id: 83 } },
      { name: 'titres' }
    ])
  })

  test("erreur de la page dans la suppression d'un titre", async () => {
    const apiMock = api.titreRemove.mockResolvedValue(null)
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api dans la suppression d'un titre", async () => {
    const apiMock = api.titreRemove.mockRejectedValue(
      new Error("error de l'api")
    )
    await store.dispatch('titre/titreRemove', titreId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: titreId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("update d'une demarche", async () => {
    const apiMock = api.titreDemarcheUpdate.mockResolvedValue(demarcheInfo)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("erreur de la page lors de l'update d'une demarche", async () => {
    const apiMock = api.titreDemarcheUpdate.mockResolvedValue(null)
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api lors de l'update d'une demarche", async () => {
    const apiMock = api.titreDemarcheUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheUpdate', demarcheInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ demarche: demarcheInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("Supression d'une demarche", async () => {
    const apiMock = api.titreDemarcheRemove.mockResolvedValue(demarcheId)
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("erreur de la page lors de la suppression d'une demarche", async () => {
    const apiMock = api.titreDemarcheRemove.mockResolvedValue(null)
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api lors de la suppression d'une demarche", async () => {
    const apiMock = api.titreDemarcheRemove.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/demarcheRemove', demarcheId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: demarcheId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("update d'une etape", async () => {
    const apiMock = api.titreEtapeUpdate.mockResolvedValue(etapeInfo)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("erreur de la page lors de l'update d'une etape", async () => {
    const apiMock = api.titreEtapeUpdate.mockResolvedValue(null)
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api lors de l'update d'une etape", async () => {
    const apiMock = api.titreEtapeUpdate.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeUpdate', etapeInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ etape: etapeInfo })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("Supression d'une etape", async () => {
    const apiMock = api.titreEtapeRemove.mockResolvedValue(etapeId)
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("erreur de la page lors de la suppression d'une etape", async () => {
    const apiMock = api.titreEtapeRemove.mockResolvedValue(null)
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(actions.pageError).toHaveBeenCalled()
  })

  test("erreur de l'api lors de la suppression d'une etape", async () => {
    const apiMock = api.titreEtapeRemove.mockRejectedValue(
      new Error("erreur de l'api")
    )
    await store.dispatch('titre/etapeRemove', etapeId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: etapeId })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
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

describe('teste le getters', () => {
  test('documentsTotal: teste si le document en cours existe ou non', () => {
    titre.state = {
      current: null,
      documents: []
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentsTotal']).toEqual(0)
  })

  test('documentsTotal: pas de demarches', () => {
    titre.state = {
      current: { démarches: null },
      documents: []
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentsTotal']).toEqual(0)
  })

  test('documentsTotal: obtient le nombre de documents exact', () => {
    titre.state = {
      current: {
        démarches: {
          m: [{ documents: [1, 2, 3] }],
          h: [{ documents: [] }],
          w: []
        }
      },
      documents: []
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentsTotal']).toEqual(3)
  })

  test('documentSelected: trouve les documents selectionnes', () => {
    titre.state = {
      current: null,
      documents: [12]
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentSelected'](12)).toBeDefined()
  })

  test('documentSelected: ne trouve pas de resultats dans les documents', () => {
    titre.state = {
      current: null,
      documents: [12]
    }
    const store = new Vuex.Store({ modules: { titre } })

    expect(store.getters['titre/documentSelected'](11)).toBeUndefined()
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
