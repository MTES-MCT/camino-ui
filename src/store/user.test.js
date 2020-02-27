import user from './user'
import * as api from '../api/utilisateurs'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurTokenCreer: jest.fn(),
  moi: jest.fn(),
  utilisateurMotDePasseInitialiser: jest.fn(),
  utilisateurMotDePasseEmailEnvoyer: jest.fn(),
  utilisateurCreationEmailEnvoyer: jest.fn(),
  utilisateurCreer: jest.fn()
}))

jest.mock('../router', () => [])

const localVue = createLocalVue()
localVue.use(Vuex)

describe("état de l'utilisateur connecté", () => {
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
      email: 'rene@la.taupe'
    }

    user.state = {
      current: null,
      preferences: {
        carte: { tilesId: 'osm-fr' },
        titres: {
          vueId: 'carte',
          filtres: { domaines: null }
        },
        demarches: {
          vueId: 'carte',
          filtres: { types: null }
        }
      },
      loaded: false,
      titresFiltresLoaded: false,
      demarchesFiltresLoaded: false
    }

    actions = {
      messageAdd: jest.fn(),
      errorRemove: jest.fn()
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
    store = new Vuex.Store({
      modules: { user, map },
      actions,
      mutations
    })
  })

  test("identifie l'utilisateur si un token valide est présent", async () => {
    localStorage.setItem('token', 'rene')
    const apiMock = api.moi.mockResolvedValue(userInfo)

    store = new Vuex.Store({ modules: { user, map }, actions, mutations })

    await store.dispatch('user/identify')

    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      email: 'rene@la.taupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.user.loaded).toBeTruthy()
  })

  test("retourne une erreur de l'api lors de l'obtention de l'utilisateur", async () => {
    const apiMock = api.moi.mockRejectedValue(new Error("erreur dans l'api"))
    localStorage.setItem('token', 'rene')
    store.commit('user/set', userInfo)
    await store.dispatch('user/identify', { email, motDePasse })

    expect(apiMock).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
  })

  test('connecte un utilisateur', async () => {
    const apiMock = api.utilisateurTokenCreer.mockResolvedValue({
      token: 'rene',
      utilisateur: userInfo
    })

    await store.dispatch('user/login', { email, motDePasse })

    expect(apiMock).toHaveBeenCalledWith({ email, motDePasse })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toEqual('rene')
    expect(store.state.user.current).toEqual({
      id: 66,
      prenom: 'rene',
      nom: 'lataupe',
      email: 'rene@la.taupe',
      permission: 'admin',
      entreprise: 'macdo'
    })
  })

  test("retourne une erreur de l'api lors de la connection d'un utilisateur", async () => {
    localStorage.setItem('token', 'rene')
    store.commit('user/set', userInfo)
    const apiMock = api.utilisateurTokenCreer.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/login', { email, motDePasse })

    expect(apiMock).toHaveBeenCalledWith({ email, motDePasse })
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('déconnecte un utilisateur', async () => {
    localStorage.setItem('token', 'value')
    store.commit('user/set', userInfo)
    await store.dispatch('user/logout')

    expect(mutations.menuClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBeNull()
    expect(store.state.user.current).toBeNull()
  })

  test('ajoute un email', async () => {
    const apiMock = api.utilisateurCreationEmailEnvoyer.mockResolvedValue(email)
    await store.dispatch('user/addEmail', email)

    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api lors de l'ajout d'un email", async () => {
    const apiMock = api.utilisateurCreationEmailEnvoyer.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/addEmail', email)

    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).not.toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('ajoute un utilisateur', async () => {
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurCreer.mockResolvedValue(userInfo)
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).toHaveBeenCalled()
  })

  test("n'ajoute pas d'utilisateur", async () => {
    const apiMock = api.utilisateurCreer.mockResolvedValue(null)
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("retourne une erreur api lors de l'ajout d'un utilisateur", async () => {
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurCreer.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/add', userInfo)

    expect(apiMock).toHaveBeenCalledWith({ utilisateur: userInfo })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()
  })

  test("crée l'email d'un utilisateur", async () => {
    const apiMock = api.utilisateurMotDePasseEmailEnvoyer.mockResolvedValue(
      userInfo
    )
    await store.dispatch('user/passwordInitEmail', email)

    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur api dans la création de l'email de l'utilisateur", async () => {
    const apiMock = api.utilisateurMotDePasseEmailEnvoyer.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('user/passwordInitEmail', email)

    expect(apiMock).toHaveBeenCalledWith({ email })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
  })

  test("initialise le mot de passe d'un utilisateur", async () => {
    const tokenSetMock = jest.fn()
    user.actions.tokenSet = tokenSetMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurMotDePasseInitialiser.mockResolvedValue({
      utilisateur: userInfo
    })
    await store.dispatch('user/passwordInit', {
      motDePasse1: motDePasse,
      motDePasse2: motDePasse
    })

    expect(apiMock).toHaveBeenCalledWith({
      motDePasse1: motDePasse,
      motDePasse2: motDePasse
    })
    expect(actions.messageAdd).toHaveBeenCalledTimes(2)
    expect(tokenSetMock).toHaveBeenCalled()
  })

  test("retourne une erreur api dans la création du mot de passe de l'utilisateur", async () => {
    const motDePasse1 = 'mignon'
    const motDePasse2 = 'mignon'
    const loginMock = jest.fn()
    user.actions.login = loginMock
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })
    const apiMock = api.utilisateurMotDePasseInitialiser.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    const res = await store.dispatch('user/passwordInit', {
      motDePasse1,
      motDePasse2,
      email
    })

    expect(apiMock).toHaveBeenCalledWith({ motDePasse1, motDePasse2 })
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()
    expect(res).toBeUndefined()
  })

  test("initialise les preferences de l'utilisateur", async () => {
    const section = 'titres.filtres'
    const params = { domainesIds: 'h' }
    await store.dispatch('user/preferencesSet', { section, params })

    expect(store.state.user.preferences.titres.filtres.domainesIds).toEqual('h')
  })

  test("initialise les preferences de l'utilisateur", async () => {
    const section = 'conditions'
    const value = 'conditionValue'
    const params = { value }
    await store.dispatch('user/preferencesSet', { section, params })

    expect(localStorage.getItem('conditions')).toEqual(value)
  })

  test("regarde si la tuile active n'appartient pas aux tuiles de la carte", () => {
    map = { state: { tiles: [{ id: 'geoportail' }] } }
    store = new Vuex.Store({ modules: { user, map }, actions, mutations })

    expect(store.getters['user/tilesActive']).toBeUndefined()
  })

  test("regarde si l'utilisateur est connecté", () => {
    user.state.current = {}
    store = new Vuex.Store({ modules: { user } })

    expect(store.getters['user/preferencesConditions']).toBeTruthy()
  })

  test('ne recupere pas les preferences sauvegardées: vieilles de plus de 3 jours', () => {
    localStorage.setItem('conditions', '3')
    expect(store.getters['user/preferencesConditions']).toBeFalsy()
  })

  test('recupere les preferences sauvegardées', () => {
    localStorage.setItem('conditions', new Date().getTime().toString())
    expect(store.getters['user/preferencesConditions']).toBeTruthy()
  })

  test("initialise le statut de l'user sans entreprises", () => {
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

  test('initialise les préférences de filtres de titres', () => {
    store.commit('user/titresFiltresLoaded')

    expect(store.state.user.titresFiltresLoaded).toBeTruthy()
  })

  test('initialise les préférences de filtres de démarches', () => {
    store.commit('user/demarchesFiltresLoaded')

    expect(store.state.user.demarchesFiltresLoaded).toBeTruthy()
  })
})
