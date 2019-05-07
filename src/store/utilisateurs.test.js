import utilisateurs from './utilisateurs'
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
  let actions
  let mutations
  beforeEach(() => {
    utilisateurId = { id: 71, nom: 'toto', prenom: 'asticot' }
    utilisateurs.state = { list: [], permissions: [] }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn()
    }
    store = new Vuex.Store({
      modules: { utilisateurs },
      mutations,
      actions
    })
  })

  test('obtient la liste des utilisateurs', async () => {
    const apiMock = api.utilisateurs.mockResolvedValue([utilisateurId])
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([utilisateurId])
  })

  test("aucun utilisateur dans l'api", async () => {
    const apiMock = api.utilisateurs.mockResolvedValue(null)
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("erreur dans l'obtention des utilisateurs", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("ajout d'un utilisateur", async () => {
    const apiMock = api.utilisateurAdd.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([utilisateurId])
  })

  test("echec de l'ajout d'un utilisateur. Erreur", async () => {
    const apiMock = api.utilisateurAdd.mockRejectedValue(
      new Error('utilisateurs erreur')
    )
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("echec de l'ajout d'un utilisateur. Deja existant", async () => {
    const apiMock = api.utilisateurAdd.mockRejectedValue(null)
    await store.dispatch('utilisateurs/add', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(store.state.utilisateurs.list).toEqual([])
  })
})

describe('interagit avec les utilisateurs deja existant', () => {
  let store
  let utilisateursIds
  let utilisateurId
  let actions
  let mutations
  let utilisateur
  let mutationsUtilisateur
  let user
  let mutationsUser
  let actionsUser
  beforeEach(() => {
    utilisateursIds = [
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' },
      { id: 46, prenom: 'peuplut', nom: 'jean', mdp: 'bon' }
    ]
    utilisateurId = { id: 46, prenom: 'peuplut', nom: 'jean', mdp: 'bon' }
    utilisateurs.state = { list: utilisateursIds, permissions: [] }

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
    mutationsUtilisateur = { set: jest.fn() }
    mutationsUser = { set: jest.fn() }
    actionsUser = { logout: jest.fn() }

    user = {
      namespaced: true,
      state: {
        current: { id: undefined }
      },
      mutations: mutationsUser,
      actions: actionsUser
    }
    utilisateur = { namespaced: true, mutations: mutationsUtilisateur }
    store = new Vuex.Store({
      modules: { utilisateurs, utilisateur, user },
      mutations,
      actions
    })
  })

  test("change l'utilisateur actif sans changer l'user", async () => {
    const apiMock = api.utilisateurUpdate.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/update', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(mutationsUtilisateur.set).toHaveBeenCalled()
    expect(mutationsUser.set).not.toHaveBeenCalled()
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("change l'utilisateur actif en changeant l'user", async () => {
    user.state.current = utilisateurId
    store = new Vuex.Store({
      modules: { utilisateurs, utilisateur, user },
      mutations,
      actions
    })
    const apiMock = api.utilisateurUpdate.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/update', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(mutationsUtilisateur.set).toHaveBeenCalled()
    expect(mutationsUser.set).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("erreur api lors du changement d'utilisateur actif", async () => {
    const apiMock = api.utilisateurUpdate.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('utilisateurs/update', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ utilisateur: utilisateurId })
    expect(mutationsUtilisateur.set).not.toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("supprime un utilisateur sans deconnecter l'user", async () => {
    const apiMock = api.utilisateurRemove.mockResolvedValue(utilisateurId)
    await store.dispatch('utilisateurs/remove', 46)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 46 })
    expect(store.state.utilisateurs.list).toEqual([
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' }
    ])
    expect(actionsUser.logout).not.toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(router.default).toEqual([{ name: 'utilisateurs' }])
  })

  test("supprime un utilisateur en deconnectant l'user", async () => {
    const apiMock = api.utilisateurRemove.mockResolvedValue(utilisateurId)
    user.state.current = utilisateurId
    store = new Vuex.Store({
      modules: { utilisateurs, utilisateur, user },
      mutations,
      actions
    })
    await store.dispatch('utilisateurs/remove', 46)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 46 })
    expect(store.state.utilisateurs.list).toEqual([
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' }
    ])
    expect(actionsUser.logout).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("l'utilisateur a supprimer n'existe pas", async () => {
    const apiMock = api.utilisateurRemove.mockResolvedValue(null)
    await store.dispatch('utilisateurs/remove', 28)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 28 })
    expect(store.state.utilisateurs.list).toEqual(utilisateursIds)
    expect(actionsUser.logout).not.toHaveBeenCalled()
    expect(mutations.popupClose).not.toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
    expect(mutations.popupMessageAdd).not.toHaveBeenCalled()
  })

  test("erreur api dans la suppression de l'utilisateur", async () => {
    const apiMock = api.utilisateurRemove.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('utilisateurs/remove', 46)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 46 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("modifie le mot de passe d'un utilisateur", async () => {
    const apiMock = api.utilisateurPasswordUpdate.mockResolvedValue({
      id: 46,
      mdp: 'jour',
      nom: 'jean',
      prenom: 'peuplut'
    })
    await store.dispatch('utilisateurs/passwordUpdate', {
      id: 46,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      id: 46,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("ne trouve pas l'utilisateur à modifier le mot de passe", async () => {
    const apiMock = api.utilisateurPasswordUpdate.mockResolvedValue(null)
    await store.dispatch('utilisateurs/passwordUpdate', {
      id: 24,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      id: 24,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })
    expect(mutations.popupClose).not.toHaveBeenCalled()
    expect(actions.messageAdd).not.toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test('erreur api dans la modification du mot de passe', async () => {
    const apiMock = api.utilisateurPasswordUpdate.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('utilisateurs/passwordUpdate', {
      id: 46,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      id: 46,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })
})

describe('test des mutations sur les utilisateurs', () => {
  let store
  let utilisateursIds
  let permissions
  let utilisateurId
  beforeEach(() => {
    permissions = ['admin', 'user', 'super']
    utilisateurId = { id: 25, nom: 'nanard', prenom: 'nanere', mdp: 'nana' }
    utilisateursIds = [
      { id: 71, nom: 'toto', prenom: 'asticot', mdp: 'rigolo' },
      { id: 46, prenom: 'peuplut', nom: 'jean', mdp: 'bon' }
    ]
    utilisateurs.state = { list: [], permissions: [] }
    store = new Vuex.Store({
      modules: { utilisateurs }
    })
  })

  test('met à jour la liste des utilisateurs', () => {
    store.commit('utilisateurs/set', utilisateursIds)

    expect(store.state.utilisateurs.list).toEqual(utilisateursIds)
  })

  test('met à jour les permissions des utilisateurs', () => {
    store.commit('utilisateurs/permissionsSet', permissions)

    expect(store.state.utilisateurs.permissions).toEqual(permissions)
  })

  test('reset les permissions', () => {
    store.commit('utilisateurs/permissionsSet', permissions)
    store.commit('utilisateurs/reset')

    expect(store.state.utilisateurs.permissions).toEqual([])
  })

  test("ajout d'un utilisateur", () => {
    store.commit('utilisateurs/add', utilisateurId)

    expect(store.state.utilisateurs.list).toEqual([utilisateurId])
  })

  test("on enleve un utilisateur de l'api", () => {
    store.commit('utilisateurs/add', utilisateurId)
    store.commit('utilisateurs/remove', 25)

    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("on enleve un utilisateur n'existant pas dans l'api", () => {
    store.commit('utilisateurs/set', utilisateursIds)
    store.commit('utilisateurs/remove', 25)

    expect(store.state.utilisateurs.list).toEqual(utilisateursIds)
  })
})
