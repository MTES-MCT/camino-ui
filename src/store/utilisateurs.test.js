import utilisateurs from './utilisateurs'
import * as Vue from 'vue'
import * as api from '../api/utilisateurs'
import * as router from '../router'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn(),
  utilisateurAdd: jest.fn(),
  utilisateurUpdate: jest.fn(),
  utilisateurRemove: jest.fn(),
  utilisateurPasswordUpdate: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

jest.mock('../router', () => [])

describe('regarde si actions marche', () => {
  let store
  beforeEach(() => {
    utilisateurs.state = { list: [], permissions: [] }
    store = new Vuex.Store({
      modules: { utilisateurs },
      mutations: {
        loadingAdd: jest.fn(),
        loadingRemove: jest.fn(),
        popupMessagesRemove: jest.fn(),
        popupClose: jest.fn()
      },
      actions: {
        pageError: jest.fn(),
        apiError: jest.fn(),
        messageAdd: jest.fn()
      }
    })
  })
  test('obtient la liste des utilisateurs', async () => {
    const returnVariable = [71, 21, 854, 5]
    const apiSpy = api.utilisateurs.mockImplementation(
      async ({}) => returnVariable
    )
    await store.dispatch('utilisateurs/get')
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(store.state.utilisateurs.list).toEqual(returnVariable)
  })
  test("aucun utilisateur dans l'api", async () => {
    const returnVariable = false
    const apiSpy = api.utilisateurs.mockImplementation(
      async ({}) => returnVariable
    )
    await store.dispatch('utilisateurs/get')
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("add: l'utilisateur existe et est ajouté", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'rene' }
    const userId = '31'
    const apiSpy = api.utilisateurAdd.mockImplementation(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.add(
      { commit: commitSpy, dispatch: dispatchSpy },
      userId
    )
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ utilisateur: userId })
  })
  test("add: l'utilisateur n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const userId = '31'
    const apiSpy = api.utilisateurAdd.mockImplementation(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.add(
      { commit: commitSpy, dispatch: dispatchSpy },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(4)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ utilisateur: userId })
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurAdd',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      4,
      'loadingRemove',
      'utilisateurAdd',
      { root: true }
    )
  })

  test("update: l'utilisateur a modifier existe et est l'utilisateur actif", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'rene' }
    const utilisateur = { id: '31' }
    const rootState = { user: { current: { id: '31' } } }
    const apiSpy = api.utilisateurUpdate.mockImplementation(
      async ({ utilisateur }) => returnVariable
    )
    await utilisateurs.actions.update(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      utilisateur
    )
    expect(commitSpy).toHaveBeenCalledTimes(6)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ utilisateur })
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `utilisateur ${returnVariable.prenom} ${
          returnVariable.nom
        } mis à jour`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurUpdate',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'utilisateur/set',
      returnVariable,
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(4, 'user/set', returnVariable, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(5, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      6,
      'loadingRemove',
      'utilisateurUpdate',
      { root: true }
    )
  })
  test("update: l'utilisateur a modifier ne correspond pas a l'utilisateur actif", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'rene' }
    const utilisateur = { id: '32' }
    const rootState = { user: { current: { id: '31' } } }
    const apiSpy = api.utilisateurUpdate.mockImplementation(
      async ({ utilisateur }) => returnVariable
    )
    await utilisateurs.actions.update(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      utilisateur
    )
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ utilisateur })
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `utilisateur ${returnVariable.prenom} ${
          returnVariable.nom
        } mis à jour`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurUpdate',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'utilisateur/set',
      returnVariable,
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(4, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      5,
      'loadingRemove',
      'utilisateurUpdate',
      { root: true }
    )
  })

  test("remove: l'utilisateur a enlever existe et est l'utilisateur actif", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'rene', id: '31' }
    const userId = '31'
    const rootState = { user: { current: { id: '31' } } }
    const apiSpy = api.utilisateurRemove.mockImplementation(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(2)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ id: userId })
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, 'user/logout', null, {
      root: true
    })
    expect(dispatchSpy).toHaveBeenNthCalledWith(
      2,
      'messageAdd',
      {
        value: `utilisateur ${returnVariable.prenom} ${
          returnVariable.nom
        } supprimé`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurRemove',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'remove', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(4, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      5,
      'loadingRemove',
      'utilisateurRemove',
      { root: true }
    )
    expect(router.default).toHaveLength(1)
    expect(router.default).toMatchObject([{ name: 'utilisateurs' }])
  })
  test("remove: l'utilisateur a enlever n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const userId = '31'
    const rootState = { user: { current: { id: '31' } } }
    const apiSpy = api.utilisateurRemove.mockImplementation(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ id: userId })
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurRemove',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'utilisateurRemove',
      { root: true }
    )
  })
  test("remove: l'utilisateur a enlever existe mais n'est pas l'utilisateur actif", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'rene', id: '32' }
    const userId = '31'
    const rootState = { user: { current: { id: '31' } } }
    const apiSpy = api.utilisateurRemove.mockImplementation(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ id: userId })
    expect(dispatchSpy).toHaveBeenNthCalledWith(
      1,
      'messageAdd',
      {
        value: `utilisateur ${returnVariable.prenom} ${
          returnVariable.nom
        } supprimé`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurRemove',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'remove', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(4, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      5,
      'loadingRemove',
      'utilisateurRemove',
      { root: true }
    )
  })

  test('passwordUpdate: le mot de passe a ete modifie', async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const userMdp = {
      id: '31',
      motDePasse: 'mdp',
      motDePasseNouveau1: 'mdpNew',
      motDePasseNouveau2: 'mdpNew'
    }
    const apiSpy = api.utilisateurPasswordUpdate.mockImplementation(
      async userMdp => returnVariable
    )
    await utilisateurs.actions.passwordUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      userMdp
    )
    expect(commitSpy).toHaveBeenCalledTimes(4)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(userMdp)
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `mot de passe modifié`,
        type: 'success'
      },
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurPasswordUpdate',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      4,
      'loadingRemove',
      'utilisateurPasswordUpdate',
      { root: true }
    )
  })
  test("passwordUpdate: l'utilisateur n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const userMdp = {
      id: '31',
      motDePasse: 'mdp',
      motDePasseNouveau1: 'mdpNew',
      motDePasseNouveau2: 'mdpNew'
    }
    const apiSpy = api.utilisateurPasswordUpdate.mockImplementation(
      async userMdp => returnVariable
    )
    await utilisateurs.actions.passwordUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      userMdp
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(userMdp)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'utilisateurPasswordUpdate',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'utilisateurPasswordUpdate',
      { root: true }
    )
  })
})

describe('test des mutations', () => {
  let store
  beforeEach(() => {
    utilisateurs.state = { list: [], permissions: [] }
    store = new Vuex.Store({
      modules: { utilisateurs }
    })
  })
  test('set: update les utilisateurs', () => {
    const titres = [78, 1, 4, 541, 5]
    store.commit('set', titres)
    expect(store.state.utilisateurs.list).toEqual(titres)
  })
  test('set: update les permissions', () => {
    const permissions = ['admin', 'user', 'super']
    store.commit('permissionsSet', permissions)
    expect(store.state.utilisateurs.permissions).toEqual(permissions)
  })
  test('reset les permissions', () => {
    store.state.utilisateurs.permissions = ['admin', 'user', 'super']
    store.commit('reset')
    expect(store.state.utilisateurs.permissions).toEqual([])
  })
  test("ajout d'un utilisateur", () => {
    const utilisateur = 95
    store.commit('add', utilisateur)
    expect(store.state.utilisateurs.list).toEqual([95])
  })
  test("on enleve un utilisateur de l'api", () => {
    store.state.utilisateurs.list = [38, 95]
    const userToRemove = 38
    store.commit('remove', userToRemove)
    expect(store.state.utilisateurs.list).toEqual([95])
  })
  test("on enleve un utilisateur n'existant pas dans l'api", () => {
    store.state.utilisateurs.list = [38, 95]
    const userToRemove = 47
    store.commit('remove', userToRemove)
    expect(store.state.utilisateurs.list).toEqual([38, 95])
  })
})
