import utilisateurs from './utilisateurs'
import * as Vue from 'vue'
import * as api from '../api'
import * as router from '../router'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api', () => ({
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

describe("interagit avec la création et l'obtention d'un utilisateur", () => {
  let store
  let utilisateurId
  beforeEach(() => {
    utilisateurId = { id: 71, nom: 'toto', prenom: 'asticot' }
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
    const apiMock = api.utilisateurs.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(store.state.utilisateurs.list).toEqual([utilisateurId])
  })

  test("aucun utilisateur dans l'api", async () => {
    const apiMock = api.utilisateurs.mockResolvedValue(null)
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("erreur dans l'obtention des utilisateurs", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue(
      new Error('erreur utilisateurs')
    )
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  test("ajout d'un utilisateur", async () => {
    const apiMock = api.utilisateurAdd.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([utilisateurId])
  })

  test("echec de l'ajout d'un utilisateur. Erreur", async () => {
    const apiMock = api.utilisateurAdd.mockRejectedValue(
      new Error('utilisateurs erreur')
    )
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("echec de l'ajout d'un utilisateur. Deja existant", async () => {
    const apiMock = api.utilisateurAdd.mockRejectedValue(null)
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([])
  })
})

describe('interagit avec les utilisateurs deja existant', () => {
  let store
  let utilisateursIds
  beforeEach(() => {
    utilisateursIds = [
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' },
      { id: 46, prenom: 'peuplut', nom: 'jean', mdp: 'bon' }
    ]
    utilisateurs.state = { list: utilisateursIds, permissions: [] }
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

  test("modifie l'utilisateur actif", async () => {
    const utilisateurNewId = {
      id: 46,
      prenom: 'neimarre'
    }
    const apiMock = api.utilisateurUpdate.mockResolvedValue(utilisateurNewId)
    await store.dispatch('utilisateurs/update', utilisateurNewId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurNewId })
    expect(store.state.utilisateurs.list).toEqual([
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' },
      { id: 46, nom: 'neimarre', prenom: 'jean', mdp: 'bon' }
    ])
  })

  test("l'utilisateur à modifier n'est pas l'utilisateur actif", async () => {
    const utilisateurNewId = { id: 46, prenom: 'neimarre' }
    const apiMock = api.utilisateurUpdate.mockResolvedValue(null)
    store.dispatch('utilisateurs/set', utilisateurNewId)

    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurNewId })
    expect(store.state.utilisateurs.list).toEqual(utilisateursIds)
  })

  test("remove: l'utilisateur a enlever existe et est l'utilisateur actif", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = { prenom: 'jean', nom: 'peuplut', id: '31' }
    const userId = '31'
    const rootState = { user: { current: { id: '31' } } }
    const apiMock = api.utilisateurRemove.mockResolvedValue(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(2)
    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ id: userId })
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
    const apiMock = api.utilisateurRemove.mockResolvedValue(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ id: userId })
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
    const returnVariable = { prenom: 'jean', nom: 'peuplut', id: '32' }
    const userId = '31'
    const rootState = { user: { current: { id: '31' } } }
    const apiMock = api.utilisateurRemove.mockResolvedValue(
      async ({ userId }) => returnVariable
    )
    await utilisateurs.actions.remove(
      { commit: commitSpy, dispatch: dispatchSpy, rootState },
      userId
    )
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith({ id: userId })
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
    const apiMock = api.utilisateurPasswordUpdate.mockResolvedValue(
      async userMdp => returnVariable
    )
    await utilisateurs.actions.passwordUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      userMdp
    )
    expect(commitSpy).toHaveBeenCalledTimes(4)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith(userMdp)
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
    const apiMock = api.utilisateurPasswordUpdate.mockResolvedValue(
      async userMdp => returnVariable
    )
    await utilisateurs.actions.passwordUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      userMdp
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiMock).toHaveBeenCalledTimes(1)
    expect(apiMock).toHaveBeenCalledWith(userMdp)
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
