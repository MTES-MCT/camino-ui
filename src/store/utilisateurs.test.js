import utilisateurs from './utilisateurs'
import * as Vue from 'vue'
import * as api from '../api/utilisateurs'
import * as router from '../router'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn(),
  utilisateurAdd: jest.fn(),
  utilisateurUpdate: jest.fn(),
  utilisateurRemove: jest.fn(),
  utilisateurPasswordUpdate: jest.fn()
}))

jest.mock('../router', () => [])

jest.mock('vue', () => ({
  set: jest.fn()
}))

describe('regarde si actions marche', () => {
  test("get: l'utilisateur existe", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const apiSpy = api.utilisateurs.mockImplementation(
      async ({}) => returnVariable
    )
    await utilisateurs.actions.get({ commit: commitSpy, dispatch: dispatchSpy })
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'utilisateurs', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'set', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'utilisateurs',
      { root: true }
    )
  })
  test("get: l'utilisateur n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const apiSpy = api.utilisateurs.mockImplementation(
      async ({}) => returnVariable
    )
    await utilisateurs.actions.get({ commit: commitSpy, dispatch: dispatchSpy })
    expect(commitSpy).toHaveBeenCalledTimes(2)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'utilisateurs', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingRemove',
      'utilisateurs',
      { root: true }
    )
    expect(dispatchSpy).toHaveBeenCalledWith('pageError', null, { root: true })
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
    expect(commitSpy).toHaveBeenCalledTimes(5)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ utilisateur: userId })
    expect(dispatchSpy).toHaveBeenCalledWith(
      'messageAdd',
      {
        value: `utilisateur ${returnVariable.prenom} ${
          returnVariable.nom
        } ajouté`,
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
      'utilisateurAdd',
      { root: true }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(4, 'add', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(
      5,
      'loadingRemove',
      'utilisateurAdd',
      { root: true }
    )
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

describe('affichage de la vue utilisateur', () => {
  test('la vue se set correctement', () => {
    const titres = []
    const apiSpy = Vue.set.mockImplementation((state, current, titres) => true)
    utilisateurs.mutations.set('state', titres)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'list', titres)
  })
  test('les permissions se set correctement', () => {
    const permissions = []
    const apiSpy = Vue.set.mockImplementation(
      (state, current, permissions) => true
    )
    utilisateurs.mutations.permissionsSet('state', permissions)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'permissions', permissions)
  })
  test('la vue se reset correctement', () => {
    const apiSpy = Vue.set.mockImplementation((state, current, titres) => true)
    utilisateurs.mutations.reset('state')
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'permissions', [])
  })
  test('on ajoute un utilisateur', () => {
    const state = { list: [] }
    utilisateurs.mutations.add(state, { id: '31' })
    expect(state.list).toHaveLength(1)
    expect(state.list).toMatchObject([{ id: '31' }])
  })
  test('on enleve un utilisateur qui se trouve dans la liste', () => {
    const state = { list: [{ id: 31 }] }
    utilisateurs.mutations.remove(state, 31)
    expect(state.list).toHaveLength(0)
    expect(state.list).toMatchObject([])
  })
  test('on enleve un utilisateur inexistant', () => {
    const state = { list: [{ id: 31 }] }
    utilisateurs.mutations.remove(state, 32)
    expect(state.list).toHaveLength(1)
    expect(state.list).toMatchObject([{ id: 31 }])
  })
})
