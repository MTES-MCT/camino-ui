import { actions, mutations } from './index'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as fileSaver from 'file-saver'
import * as router from '../router'

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))
jest.mock('./titre', () => ({ titre: jest.fn() }))
jest.mock('./titres', () => ({ titres: jest.fn() }))
jest.mock('./titre-demarche', () => ({ titreDemarche: jest.fn() }))
jest.mock('./titre-creation', () => ({ titreCreation: jest.fn() }))
jest.mock('./titre-etape', () => ({ titreEtape: jest.fn() }))
jest.mock('./titre-etape-edition', () => ({ titreEtape: jest.fn() }))
jest.mock('./document', () => ({ document: jest.fn() }))
jest.mock('./titres-demarches', () => ({ titresDemarches: jest.fn() }))
jest.mock('./utilisateur', () => ({ utilisateur: jest.fn() }))
jest.mock('./utilisateurs', () => ({ utilisateurs: jest.fn() }))
jest.mock('./entreprises', () => ({ entreprises: jest.fn() }))
jest.mock('./entreprise', () => ({ entreprise: jest.fn() }))
jest.mock('./administration', () => ({ administration: jest.fn() }))
jest.mock('./administrations', () => ({ administrations: jest.fn() }))
jest.mock('./user', () => ({ user: jest.fn() }))
jest.mock('./titre-activite', () => ({ titreActivite: jest.fn() }))
jest.mock('./titre-activite-edition', () => ({
  titreActiviteEdition: jest.fn()
}))
jest.mock('./titres-activites', () => ({ titresActivites: jest.fn() }))
jest.mock('./statistiques', () => ({ statistiques: jest.fn() }))
jest.mock('./definitions', () => ({ definitions: jest.fn() }))
jest.mock('./metas', () => ({ metas: jest.fn() }))
jest.mock('./meta', () => ({ meta: jest.fn() }))
jest.mock('./journaux', () => ({ journaux: jest.fn() }))

jest.mock('../router', () => ({
  replace: jest.fn(),
  push: jest.fn()
}))

console.info = jest.fn()
console.error = jest.fn()
jest.useFakeTimers()

describe("état général de l'application", () => {
  let state
  let store
  let modules

  beforeEach(() => {
    modules = {
      titre: {
        namespaced: true,
        state: { element: null },
        actions: {
          get: jest.fn()
        }
      },
      route: {
        namespaced: true,
        state: {
          query: {}
        }
      }
    }

    state = {
      config: {},
      messages: [],
      popup: { component: null, props: null, messages: [], loading: false },
      error: null,
      menu: { component: null },
      loading: [],
      loaded: false,
      fileLoading: {
        loaded: 0,
        total: 0
      }
    }

    store = createStore({
      modules,
      state,
      actions,
      mutations
    })

    const app = createApp({})
    app.use(store)

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

    expect(state.popup).toMatchObject({
      component: { _value: null },
      props: null,
      messages: [],
      loading: false
    })
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
    await store.dispatch('apiError', 'message')

    expect(state.messages).toEqual([
      {
        id: 1487076708000,
        type: 'error',
        value: 'Erreur : message'
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
    store.commit('errorUpdate', { id: 'erreur-test' })
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

    expect(state.menu.component).toMatchObject({ _value: component })
  })

  test('ouvre un nouveau menu', async () => {
    const component = { name: 'hello' }
    await store.dispatch('menuToggle', component)

    expect(state.menu.component).toMatchObject({ _value: component })
  })

  test("recharge la page si l'id du titre n'a pas changé", async () => {
    store.state.route.params = { id: 'titre-id' }
    await store.dispatch('reload', { name: 'titre', id: 'titre-id' })

    expect(modules.titre.actions.get).toHaveBeenCalled()
  })

  test("charge la nouvelle page si l'id du titre a changé", async () => {
    store.state.route.params = { id: 'id-test' }
    await store.dispatch('reload', { name: 'titre', id: 'titre-id-new' })

    expect(router.replace).toHaveBeenCalled()
  })

  test("ne recharge pas la page si l'id n'a pas changé", async () => {
    store.state.route.params = { id: 'id-test' }
    await store.dispatch('reload', { name: 'titre', id: 'id-test' })

    expect(router.replace).not.toHaveBeenCalled()
    expect(modules.titre.actions.get).toHaveBeenCalled()
  })

  test("recharge la page si il n'y a pas d'id", async () => {
    store.state.titre.element = { id: 'id-test', nom: 'marne' }
    await store.dispatch('reload', { name: 'titres' })

    expect(router.push).toHaveBeenCalled()
  })

  test("met à jour les paramètres d'url", async () => {
    await store.dispatch('urlQueryUpdate', {
      params: { typesIds: null },
      definitions: [{ id: 'typesIds', type: 'strings', elements: [] }]
    })

    expect(router.push).not.toHaveBeenCalled()
    expect(router.replace).not.toHaveBeenCalled()

    await store.dispatch('urlQueryUpdate', {
      params: { typesIds: ['pr', 'ar'] },
      definitions: [{ id: 'typesIds', type: 'strings', elements: [] }]
    })

    expect(router.replace).toHaveBeenCalledWith({
      query: { typesIds: 'pr,ar' }
    })

    store.state.route.query.typesIds = 'pr,ar'

    await store.dispatch('urlQueryUpdate', {
      params: { typesIds: ['cx'] },
      definitions: [{ id: 'typesIds', type: 'strings', elements: [] }]
    })

    expect(router.push).toHaveBeenCalledWith({
      query: { typesIds: 'cx' }
    })
  })
})

describe("état général de l'application", () => {
  let state
  let store

  beforeEach(() => {
    state = {
      messages: [],
      loading: [],
      fileLoading: {
        loaded: 0,
        total: 0
      }
    }

    localStorage.clear()
  })

  test('supprime un message', async () => {
    const messageRemoveMock = jest.fn()
    mutations.messageRemove = messageRemoveMock
    store = createStore({ actions, state, mutations })
    const message = { id: 14, message: 'message important' }
    await store.dispatch('messageAdd', message)

    const res = state.messages.pop()
    expect(res.message).toEqual('message important')
    expect(res.id).toBeLessThanOrEqual(Date.now())
    jest.advanceTimersByTime(4500)
    // expect(setTimeout).toHaveBeenCalled()
    // expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4500)
    expect(messageRemoveMock).toHaveBeenCalled()
  })

  test('télécharge un document du serveur', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = createStore({ state, actions, mutations })

    await store.dispatch('downloadDocument', { id: 'toot' })

    expect(fileSaver.saveAs).toHaveBeenCalledWith('/apiUrl/fichiers/toot')
    expect(messageAddMock).toHaveBeenCalled()
    expect(state.loading).toEqual([])
  })

  test('télécharge un nouveau document depuis le navigateur', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = createStore({ state, actions, mutations })

    await store.dispatch('downloadDocument', {
      fichierNouveau: { name: 'document-titre' }
    })

    expect(fileSaver.saveAs).toHaveBeenCalled()
    expect(messageAddMock).toHaveBeenCalled()
    expect(state.loading).toEqual([])
  })

  test('télécharge du contenu', async () => {
    const messageAddMock = jest.fn()
    actions.messageAdd = messageAddMock
    store = createStore({ state, actions, mutations })

    const section = 'titres'
    const params = { typeIds: ['m', 'w'] }

    await store.dispatch('download', `/${section}?${params}`)

    expect(fileSaver.saveAs).toHaveBeenCalledWith(
      `/apiUrl/${section}?${params}`
    )
    expect(messageAddMock).toHaveBeenCalled()
    expect(state.loading).toEqual([])
  })
})
