import user from './user'
import * as api from '../api'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api', () => ({
  utilisateurLogin: jest.fn(),
  utilisateurIdentify: jest.fn(),
  utilisateurPasswordInit: jest.fn(),
  utilisateurPasswordInitEmail: jest.fn(),
  utilisateurAddEmail: jest.fn(),
  utilisateurAdd: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../router', () => [])

describe('teste user', () => {
  let store
  let actions
  let mutations
  let userInfo
  let map
  let email
  let motDePasse
  beforeEach(() => {
    email = 'rene@la.taupe'
    motDePasse = 'mignon'
    userInfo = {
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin',
      entreprise: 'macdo',
      email: 'rene@la.taupe',
      motDePasse: 'mignon'
    }
    user.state = {
      current: null,
      preferences: {
        carte: { tilesId: 'osm-fr' },
        filtres: {},
        titres: { vueId: 'carte', pageActive: 1, pagesRange: 200 }
      }
    }
    actions = {
      load: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      popupMessagesRemove: jest.fn(),
      loadingAdd: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      loadingRemove: jest.fn(),
      menuClose: jest.fn()
    }
    map = { state: { tiles: [{ id: 'osm-fr' }, { id: 'geoportail' }] } }
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    localStorage.clear()
  })

  test("initialise l'user si un token existe", async () => {
    localStorage.setItem('token', 'rene')
    const apiMock = api.utilisateurIdentify.mockResolvedValue({
      token: 'rene',
      utilisateur: userInfo
    })
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    await store.dispatch('user/init')

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith()
  })

  test("n'initialise pas l'user si aucun token n'existe", async () => {
    await store.dispatch('user/init')

    expect(localStorage.getItem('token')).toBeNull()
  })

  test("identifie l'user", async () => {
    const apiMock = api.utilisateurIdentify.mockResolvedValue({
      token: 'rene',
      utilisateur: userInfo
    })
    await store.dispatch('user/identify', { email, motDePasse })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith()
    expect(localStorage.getItem('token')).toEqual('rene')
    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
  })

  test("erreur de l'api lors de l'identification de l'user", async () => {
    const apiMock = api.utilisateurIdentify.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    localStorage.setItem('token', 'rene')
    store.commit('set', userInfo)
    await store.dispatch('user/identify', { email, motDePasse })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith()
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
  })

  test('login un user', async () => {
    const apiMock = api.utilisateurLogin.mockResolvedValue({
      token: 'rene',
      utilisateur: userInfo
    })
    await store.dispatch('user/login', { email, motDePasse })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email, motDePasse })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(actions.load).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toEqual('rene')
    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
  })

  test("erreur de l'api lors du login d'un user", async () => {
    localStorage.setItem('token', 'rene')
    store.commit('set', userInfo)
    const apiMock = api.utilisateurLogin.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/login', { email, motDePasse })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email, motDePasse })
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('logout un user', () => {
    localStorage.setItem('token', 'value')
    store.commit('user/set', userInfo)
    store.dispatch('user/logout')

    expect(mutations.menuClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(actions.load).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
  })

  test('ajoute un email', async () => {
    const apiMock = api.utilisateurAddEmail.mockResolvedValue(email)
    await store.dispatch('user/addEmail', email)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("erreur de l'api lors de l'ajout d'un email", async () => {
    const apiMock = api.utilisateurAddEmail.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/addEmail', email)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).not.toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('ajoute un user', async () => {
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurAdd.mockResolvedValue(userInfo)
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).toHaveBeenCalled()
  })

  test("n'ajoute pas d'utilisateur", async () => {
    const apiMock = api.utilisateurAdd.mockResolvedValue(null)
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("erreur api lors de l'ajout d'un user", async () => {
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurAdd.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()
  })

  test("inite l'email d'un user", async () => {
    const apiMock = api.utilisateurPasswordInitEmail.mockResolvedValue(userInfo)
    await store.dispatch('user/passwordInitEmail', email)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("erreur api dans la création de l'email de l'user", async () => {
    const apiMock = api.utilisateurPasswordInitEmail.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/passwordInitEmail', email)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("initie le mot de passe d'un user", async () => {
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurPasswordInit.mockResolvedValue(userInfo)
    const res = await store.dispatch('user/passwordInit', {
      motDePasse1: motDePasse,
      motDePasse2: motDePasse,
      email
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      motDePasse1: motDePasse,
      motDePasse2: motDePasse
    })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).toHaveBeenCalled()
    expect(res).toEqual(userInfo)
  })

  test("erreur api dans la création du mot de passe de l'user", async () => {
    const motDePasse1 = 'mignon'
    const motDePasse2 = 'mignon'
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurPasswordInit.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    const res = await store.dispatch('user/passwordInit', {
      motDePasse1,
      motDePasse2,
      email
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ motDePasse1, motDePasse2 })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()
    expect(res).toBeUndefined()
  })

  test("set les preferences de l'utilisateur sans conditions", async () => {
    const section = 'filtres.domaines'
    const value = 'c,w'
    await store.dispatch('user/preferenceSet', { section, value })

    expect(store.state.user.preferences.filtres.domaines).toEqual(value)
    expect(localStorage.getItem('conditions')).toBeNull()
  })

  test("set les preferences de l'utilisateur avec conditions", async () => {
    const section = 'conditions'
    const value = 'conditionValue'
    await store.dispatch('user/preferenceSet', { section, value })

    expect(store.state.user.preferences.conditions).toEqual(value)
    expect(localStorage.getItem('conditions')).toEqual(value)
  })

  test('reset les preferences', async () => {
    const section = 'filtres.domaines'
    const value = 'c,w'
    await store.dispatch('user/preferenceSet', { section, value })
    await store.dispatch('user/preferenceReset', { section })

    expect(store.state.user.preferences.filtres.domaines).toBeUndefined()
  })

  test('cree le token', async () => {
    await store.dispatch('user/tokenSet', 'value')

    expect(localStorage.getItem('token')).toEqual('value')
  })

  test('enleve le token', async () => {
    localStorage.setItem('token', 'value')
    await store.dispatch('user/tokenRemove')

    expect(localStorage.getItem('token')).toBeNull()
  })

  test('regarde si la tuile active appartient aux tuiles de la carte', () => {
    expect(store.getters['user/tilesActive']).toEqual({ id: 'osm-fr' })
  })

  test("la tuile active n'appartient pas aux tuiles de la carte", () => {
    map = { state: { tiles: [{ id: 'geoportail' }] } }
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })

    expect(store.getters['user/tilesActive']).toBeUndefined()
  })

  test("teste si l'user est connecté", () => {
    user.state.current = {}
    store = new Vuex.Store({ modules: { user } })

    expect(store.getters['user/preferencesConditions']).toBeTruthy()
  })

  test('pas de préferences sauvegardées', () => {
    expect(store.getters['user/preferencesConditions']).toBeFalsy()
  })

  test('des preferences sauvegardées existent mais sont vieilles de plus de 3 jours', () => {
    localStorage.setItem('conditions', '3')
    expect(store.getters['user/preferencesConditions']).toBeFalsy()
  })

  test('des preferences sauvegardées existent depuis moins 3 jours', () => {
    localStorage.setItem('conditions', new Date().getTime().toString())
    expect(store.getters['user/preferencesConditions']).toBeTruthy()
  })

  test("set les preferences de l'user", () => {
    const section = 'filtres.domaines'
    const value = 'c,w'
    store.commit('user/preferenceSet', { section, value })

    expect(store.state.user.preferences.filtres.domaines).toBeDefined()
    expect(store.state.user.preferences.filtres.domaines).toEqual(value)
  })

  test("reset les preferences de l'user", () => {
    const section = 'filtres.domaines'
    const value = 'c,w'
    store.commit('user/preferenceSet', { section, value })
    expect(store.state.user.preferences.filtres.domaines).toEqual(value)
    store.commit('user/preferenceReset', { section })

    expect(store.state.user.preferences.filtres.domaines).toBeUndefined()
  })

  test("set le statut de l'user avec une entreprise", () => {
    store.commit('user/set', userInfo)

    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
  })

  test("set le statut de l'user sans entreprises", () => {
    store.commit('user/set', {
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin'
    })

    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin'
    })
    expect(store.state.user.current.entreprise).toBeUndefined()
  })

  test("reset le statut de l'user", () => {
    store.commit('user/set', userInfo)
    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
    store.commit('user/reset')

    expect(store.state.user.current).toBeNull()
  })
})
