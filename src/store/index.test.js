import { actions, mutations } from './index'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as fileSaver from 'file-saver'

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))
jest.mock('./titre', () => ({ titre: jest.fn() }))
jest.mock('./titres', () => ({ titres: jest.fn() }))
jest.mock('./metas', () => ({ metas: jest.fn() }))
jest.mock('./map', () => ({ map: jest.fn() }))
jest.mock('./utilisateur', () => ({ utilisateur: jest.fn() }))
jest.mock('./utilisateurs', () => ({ utilisateurs: jest.fn() }))
jest.mock('./entreprises', () => ({ entreprises: jest.fn() }))
jest.mock('./entreprise', () => ({ entreprise: jest.fn() }))
jest.mock('./administration', () => ({ administration: jest.fn() }))
jest.mock('./administrations', () => ({ administrations: jest.fn() }))
jest.mock('./substances', () => ({ substances: jest.fn() }))
jest.mock('./user', () => ({ user: jest.fn() }))
jest.mock('./titre-activites', () => ({ titreActivites: jest.fn() }))
jest.mock('./statistiques', () => ({ statistiques: jest.fn() }))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

jest.useFakeTimers()

describe("état général de l'application", () => {
  let state
  let store

  beforeEach(() => {
    state = {
      config: {},
      messages: [],
      popup: { component: null, props: null, messages: [], loading: false },
      error: null,
      menu: { component: null },
      loading: [],
      loaded: false
    }

    store = new Vuex.Store({
      state,
      actions,
      mutations
    })

    localStorage.clear()
  })

  test('ajoute un message', () => {
    const message = { id: 42, message: 'message très important' }
    store.commit('messageAdd', message)

    expect(state.messages).toEqual([message])
  })

  test('met la popup en état de chargement', () => {
    store.commit('popupLoad')

    expect(state.popup.loading).toBe(true)
  })

  test('supprime un message', () => {
    const message = { id: 42, message: 'message très important' }
    store.commit('messageAdd', message)
    store.commit('messageRemove', 42)

    expect(state.messages).toEqual([])
  })

  test('ferme la pop-up', () => {
    const component = 'open'
    const props = 'open'
    store.commit('popupOpen', { component, props })
    store.commit('popupClose')

    expect(state.popup).toEqual({
      component: null,
      props: null,
      messages: [],
      loading: false
    })
  })

  test('supprime les erreurs', () => {
    const error = 'erreur api'
    store.commit('errorAdd', error)
    store.commit('errorRemove')

    expect(state.error).toBeNull()
  })

  test('ajoute un message de la pop-up', () => {
    const message = 'message très important'
    store.commit('popupMessageAdd', message)

    expect(state.popup.messages).toEqual([message])
  })

  test('supprime les messages de la pop-up', () => {
    const message = 'message très important'
    store.commit('popupMessageAdd', message)
    store.commit('popupMessagesRemove')

    expect(state.popup.messages).toEqual([])
  })

  test("trace si un appel à l'api est en cours", () => {
    store.commit('loadingAdd', 'nom1')
    store.commit('loadingAdd', 'nom2')
    store.commit('loadingRemove', 'nom2')
    store.commit('loadingRemove', 'nom3')

    expect(state.loading).toEqual(['nom1'])
  })

  test("retourne une erreur de l'api", async () => {
    Date.now = jest.fn(() => 1487076708000)
    process.env.VUE_APP_API_URL = 'http://api.camino-test-url.dev'
    await store.dispatch('apiError')

    expect(state.messages).toEqual([
      {
        id: 1487076708000,
        type: 'error',
        value:
          "Erreur: impossible de se connecter à l'API (http://api.camino-test-url.dev)"
      }
    ])
  })

  test('retourne une erreur 404', async () => {
    await store.dispatch('pageError')

    expect(state.error).toEqual({
      type: 'error',
      value: `Erreur: page introuvable`
    })
  })

  test("ne supprime pas d'erreur s'il n'y en a pas", async () => {
    await store.dispatch('errorRemove')

    expect(state.error).toEqual(null)
  })

  test('supprime une erreur', async () => {
    store.commit('errorAdd', { id: 'erreur-test' })
    await store.dispatch('errorRemove')

    expect(state.error).toEqual(null)
  })

  test('ferme le menu', async () => {
    store.state.menu.component = { name: 'menu' }
    const component = { name: 'menu' }

    await store.dispatch('menuToggle', component)

    expect(state.menu.component).toBeNull()
  })

  test('ferme le menu et en ouvre un autre', async () => {
    store.state.menu.component = { name: 'bonjour' }
    const component = { name: 'hello' }

    await store.dispatch('menuToggle', component)

    expect(state.menu.component).toEqual(component)
  })

  test('ouvre un nouveau menu', async () => {
    const component = { name: 'hello' }
    await store.dispatch('menuToggle', component)

    expect(state.menu.component).toEqual(component)
  })
})

describe("état général de l'application", () => {
  let state
  let store

  beforeEach(() => {
    state = { messages: [] }

    localStorage.clear()
    fetch.resetMocks()
  })

  test('supprime un message', async () => {
    const messageRemoveMock = jest.fn()
    mutations.messageRemove = messageRemoveMock
    store = new Vuex.Store({ actions, state, mutations })
    const message = { id: 14, message: 'message important' }
    await store.dispatch('messageAdd', message)

    const res = state.messages.pop()
    expect(res.message).toEqual('message important')
    expect(res.id).toBeLessThanOrEqual(Date.now())
    jest.advanceTimersByTime(4500)
    expect(setTimeout).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4500)
    expect(messageRemoveMock).toHaveBeenCalled()
  })

  test('télécharge un document', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = new Vuex.Store({ state, actions, mutations })
    const documentId = 'crique-sophie'
    const fichierTypeId = 'pdf'
    localStorage.setItem('token', 'privateToken')
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }))
    await store.dispatch('documentDownload', { documentId, fichierTypeId })

    expect(fetch).toHaveBeenCalled()
    expect(fileSaver.saveAs).toHaveBeenCalled()
    expect(messageAddMock).toHaveBeenCalled()
  })

  test("retourne une erreur lors du téléchargement d'un document", async () => {
    const apiErrorMock = jest.fn()
    actions.apiError = apiErrorMock
    store = new Vuex.Store({ state, actions, mutations })
    const documentId = 'crique-sophie'
    const fichierTypeId = 'pdf'
    localStorage.removeItem('token')
    fetch.mockReject(new Error('erreur api'))
    await store.dispatch('documentDownload', { documentId, fichierTypeId })

    expect(fetch).toHaveBeenCalled()
    expect(apiErrorMock).toHaveBeenCalled()
  })

  test('retourne une erreur si un document est introuvable', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = new Vuex.Store({ state, actions, mutations })
    const documentId = 'crique-sophie'
    const fichierTypeId = 'pdf'
    localStorage.setItem('token', 'privateToken')
    fetch.mockResponseOnce('fichier introuvable', { status: 404 })
    await store.dispatch('documentDownload', { documentId, fichierTypeId })

    expect(fetch).toHaveBeenCalled()
    expect(fileSaver.saveAs).not.toHaveBeenCalled()
    expect(messageAddMock).not.toHaveBeenCalled()
  })
})
