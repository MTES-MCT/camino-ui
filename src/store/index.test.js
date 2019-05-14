import { actions, mutations } from './index'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import * as api from '../api'

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

describe('teste les fonctions utilisées dans les autres scripts', () => {
  let state
  let store
  let modules
  let setMetas, permissionsSetUtilisateurs, setSubstances, setEntreprises

  beforeEach(() => {
    state = {
      config: {},
      messages: [],
      popup: { component: null, props: null, messages: [] },
      error: null,
      menu: { component: null },
      versions: {
        api: null,
        ui: `${npmVersion}`
      },
      loading: [],
      loaded: false,
      route: null
    }
    setMetas = jest.fn()
    permissionsSetUtilisateurs = jest.fn()
    setSubstances = jest.fn()
    setEntreprises = jest.fn()

    modules = {
      metas: { namespaced: true, actions: { set: setMetas } },
      utilisateurs: {
        namespaced: true,
        mutations: { permissionsSet: permissionsSetUtilisateurs }
      },
      entreprises: { namespaced: true, mutations: { set: setEntreprises } },
      substances: { namespaced: true, mutations: { set: setSubstances } }
    }

    store = new Vuex.Store({
      modules,
      state,
      actions,
      mutations
    })
    localStorage.clear()
    // fetch.resetMocks()
  })

  test("ecrit la version de l'api", () => {
    const version = '10.4'
    store.commit('apiVersionSet', version)

    expect(state.versions.api).toEqual(version)
  })

  test("charge l'etat", () => {
    store.commit('loaded')

    expect(state.loaded).toBeTruthy()
  })

  test('ajoute un message', () => {
    const message = { id: 42, message: 'message très important' }
    store.commit('messageAdd', message)

    expect(state.messages).toEqual([message])
  })

  test('supprime un message', () => {
    const message = { id: 42, message: 'message très important' }
    store.commit('messageAdd', message)
    expect(state.messages).toEqual([message])
    store.commit('messageRemove', 42)

    expect(state.messages).toEqual([])
  })

  test('ouvre une pop up', () => {
    const component = 'open'
    const props = 'open'
    store.commit('popupOpen', { component, props })

    expect(state.popup).toEqual({
      component: 'open',
      props: 'open',
      messages: []
    })
  })

  test('ferme les pops up', () => {
    const component = 'open'
    const props = 'open'
    store.commit('popupOpen', { component, props })
    store.commit('popupClose')

    expect(state.popup).toEqual({
      component: null,
      props: null,
      messages: []
    })
  })

  test('ajoute une erreur', () => {
    const error = 'erreur api'
    store.commit('errorAdd', error)

    expect(state.error).toEqual(error)
  })

  test('supprime les erreurs', () => {
    const error = 'erreur api'
    store.commit('errorAdd', error)
    store.commit('errorRemove')

    expect(state.error).toBeNull()
  })

  test('ouvre le menu', () => {
    const component = 'component'
    store.commit('menuOpen', component)

    expect(state.menu.component).toEqual(component)
  })

  test('ferme le menu', () => {
    const component = 'component'
    store.commit('menuOpen', component)
    store.commit('menuClose')

    expect(state.menu.component).toBeNull()
  })

  test('ajoute un message de popup', () => {
    const message = 'message très important'
    store.commit('popupMessageAdd', message)

    expect(state.popup.messages).toEqual([message])
  })

  test('supprime les messages de popup', () => {
    const message = 'message très important'
    store.commit('popupMessageAdd', message)
    store.commit('popupMessagesRemove')

    expect(state.popup.messages).toEqual([])
  })

  test("charge le nom d'un element", () => {
    const name = 'nom'
    store.commit('loadingAdd', name)

    expect(state.loading).toEqual([name])
  })

  test("supprime le nom d'un element", () => {
    const name1 = 'nom1'
    const name2 = 'nom2'
    store.commit('loadingAdd', name1)
    store.commit('loadingAdd', name2)
    store.commit('loadingRemove', name1)

    expect(state.loading).toEqual([name2])
  })

  test("supprime le nom d'un element n'existant pas", () => {
    const name1 = 'nom1'
    const name2 = 'nom2'
    store.commit('loadingAdd', name1)
    store.commit('loadingRemove', name2)

    expect(state.loading).toEqual([name1])
  })

  // test('documentDownload', async () => {
  //   const titreDocumentId = 'crique-sophie'
  //   const fileName = 'criqueSophie'
  //   jest.spyOn(global, 'fetch').mockResolvedValue(
  //     Promise.resolve({
  //       json: () => Promise.resolve({})
  //     })
  //   )
  //   localStorage.setItem('token', 'privateToken')
  //   await store.dispatch('documentDownload', { titreDocumentId, fileName })

  //   expect(global.fetch).toHaveBeenCalled()
  // })

  test('initie tout les différents types de composants', async () => {
    const errorRemoveMock = jest.fn()
    mutations.errorRemove = errorRemoveMock
    const apiVersionSetMock = jest.fn()
    mutations.apiVersionSet = apiVersionSetMock
    store = new Vuex.Store({ modules, state, actions, mutations })
    api.init.mockResolvedValue({
      version: '10.4',
      metas: { domaines: 'c,w', statuts: 'val' },
      substances: 'or',
      permissions: 'admin',
      entreprises: 'macdo'
    })
    await store.dispatch('init')

    expect(errorRemoveMock).toHaveBeenCalled()
    expect(apiVersionSetMock).toHaveBeenCalled()
    expect(permissionsSetUtilisateurs).toHaveBeenCalled()
    expect(setSubstances).toHaveBeenCalled()
    expect(setEntreprises).toHaveBeenCalled()
    expect(setMetas).toHaveBeenCalled()
  })

  test('initie sans composants', async () => {
    api.init.mockResolvedValue({})
    await store.dispatch('init')

    expect(state.versions.api).toBeNull()
    expect(permissionsSetUtilisateurs).not.toHaveBeenCalled()
    expect(setSubstances).not.toHaveBeenCalled()
    expect(setEntreprises).not.toHaveBeenCalled()
    expect(setMetas).not.toHaveBeenCalled()
  })

  test("erreur api lors de l'initiation", async () => {
    api.init.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('init')

    expect(state.messages.pop().type).toEqual('error')
    expect(console.log).toHaveBeenCalled()
  })

  test("renvoie une erreur definie de l'api", async () => {
    Date.now = jest.fn(() => 1487076708000)
    const error = 'erreur api'
    await store.dispatch('apiError', error)

    expect(state.messages).toEqual([
      { id: 1487076708000, type: 'error', value: 'erreur api' }
    ])
  })

  test("renvoie une erreur indefinie de l'api", async () => {
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

  test('renvoie une erreur de la page', async () => {
    await store.dispatch('pageError')

    expect(state.error).toEqual({
      type: 'error',
      value: `Erreur: page introuvable`
    })
  })

  test('ajoute un message et le supprime plus tard', async () => {
    const message = { id: 14, message: 'message important' }
    await store.dispatch('messageAdd', message)

    const res = state.messages.pop()
    expect(res.message).toEqual('message important')
    expect(res.id).toBeLessThanOrEqual(new Date().valueOf())
    expect(setTimeout).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4500)
  })

  test('ferme le menu deja ouvert', async () => {
    store.state.menu.component = { name: 'menu' }
    const component = { name: 'menu' }

    await store.dispatch('menuToggle', component)

    expect(state.menu.component).toBeNull()
  })

  test('ferme le menu pour en rouvrir un autre', async () => {
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
