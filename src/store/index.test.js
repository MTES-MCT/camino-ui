import { actions, mutations } from './index'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import * as api from '../api'
import * as fileSaver from 'file-saver'

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))
jest.mock('../api', () => ({ init: jest.fn() }))
jest.mock('./titre', () => ({ titre: jest.fn() }))
jest.mock('./titres', () => ({ titres: jest.fn() }))
jest.mock('./metas', () => ({ metas: jest.fn() }))
jest.mock('./map', () => ({ map: jest.fn() }))
jest.mock('./utilisateur', () => ({ utilisateur: jest.fn() }))
jest.mock('./utilisateurs', () => ({ utilisateurs: jest.fn() }))
jest.mock('./entreprises', () => ({ entreprises: jest.fn() }))
jest.mock('./substances', () => ({ substances: jest.fn() }))
jest.mock('./user', () => ({ user: jest.fn() }))
jest.mock('./titre-activites', () => ({ titreActivites: jest.fn() }))

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

console.log = jest.fn()

jest.useFakeTimers()

describe("état général de l'application", () => {
  let state
  let store
  let modules
  let metasSet, utilisateursPermissionsSet, substancesSet, entreprisesSet

  beforeEach(() => {
    state = {
      config: {},
      messages: [],
      popup: { component: null, props: null, messages: [], loading: false },
      error: null,
      menu: { component: null },
      versions: {
        api: null,
        /* global npmVersion */
        // @ts-ignore
        ui: `${npmVersion}`
      },
      loading: [],
      loaded: false
    }
    metasSet = jest.fn()
    utilisateursPermissionsSet = jest.fn()
    substancesSet = jest.fn()
    entreprisesSet = jest.fn()

    modules = {
      metas: { namespaced: true, mutations: { set: metasSet } },
      utilisateurs: {
        namespaced: true,
        mutations: { permissionsSet: utilisateursPermissionsSet }
      },
      entreprises: { namespaced: true, mutations: { set: entreprisesSet } },
      substances: { namespaced: true, mutations: { set: substancesSet } }
    }

    store = new Vuex.Store({
      modules,
      state,
      actions,
      mutations
    })

    localStorage.clear()
    fetch.resetMocks()
  })

  test("retourne la version de l'api", () => {
    const version = '10.4'
    store.commit('apiVersionSet', version)

    expect(state.versions.api).toEqual(version)
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
    const name1 = 'nom1'
    const name2 = 'nom2'
    store.commit('loadingAdd', name1)
    store.commit('loadingRemove', name2)

    expect(state.loading).toEqual([name1])
  })

  test("initialise l'application", async () => {
    state.error = true
    api.init.mockResolvedValue({
      version: '10.4',
      metas: { domaines: 'c,w', statuts: 'val' },
      substances: 'or',
      permissions: 'admin',
      entreprises: 'macdo'
    })
    await store.dispatch('init')

    expect(utilisateursPermissionsSet).toHaveBeenCalled()
    expect(substancesSet).toHaveBeenCalled()
    expect(entreprisesSet).toHaveBeenCalled()
    expect(metasSet).toHaveBeenCalled()
  })

  test("initialise l'application sans métas", async () => {
    state.loaded = true
    api.init.mockResolvedValue({ version: null })
    await store.dispatch('init')

    expect(state.versions.api).toBeNull()
    expect(utilisateursPermissionsSet).toHaveBeenCalled()
    expect(substancesSet).toHaveBeenCalled()
    expect(entreprisesSet).toHaveBeenCalled()
    expect(metasSet).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de l'initialisation", async () => {
    api.init.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('init')

    expect(state.messages.pop().type).toEqual('error')
    expect(console.log).toHaveBeenCalled()
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

  test('supprime un message', async () => {
    const messageRemoveMock = jest.fn()
    mutations.messageRemove = messageRemoveMock
    store = new Vuex.Store({ modules, actions, state, mutations })
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

  test('télécharge un document', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = new Vuex.Store({ modules, state, actions, mutations })
    const titreDocumentId = 'crique-sophie'
    const fileName = 'criqueSophie'
    localStorage.setItem('token', 'privateToken')
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }))
    await store.dispatch('documentDownload', { titreDocumentId, fileName })

    expect(fetch).toHaveBeenCalled()
    expect(fileSaver.saveAs).toHaveBeenCalled()
    expect(messageAddMock).toHaveBeenCalled()
  })

  test("retourne une erreur lors du téléchargement d'un document", async () => {
    const apiErrorMock = jest.fn()
    actions.apiError = apiErrorMock
    store = new Vuex.Store({ modules, state, actions, mutations })
    const titreDocumentId = 'crique-sophie'
    const fileName = 'criqueSophie'
    localStorage.removeItem('token')
    fetch.mockReject(new Error('erreur api'))
    await store.dispatch('documentDownload', { titreDocumentId, fileName })

    expect(fetch).toHaveBeenCalled()
    expect(apiErrorMock).toHaveBeenCalled()
  })

  test('retourne une erreur si un document est introuvable', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = new Vuex.Store({ modules, state, actions, mutations })
    const titreDocumentId = 'crique-sophie'
    const fileName = 'criqueSophie'
    localStorage.setItem('token', 'privateToken')
    fetch.mockResponseOnce('fichier introuvable', { status: 404 })
    await store.dispatch('documentDownload', { titreDocumentId, fileName })

    expect(fetch).toHaveBeenCalled()
    expect(fileSaver.saveAs).not.toHaveBeenCalled()
    expect(messageAddMock).not.toHaveBeenCalled()
  })
})
