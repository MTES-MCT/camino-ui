import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as router from '../router'
import * as api from '../api/utilisateurs'

import utilisateur from './utilisateur'

jest.mock('../api/utilisateurs', () => ({
  metasUtilisateur: jest.fn(),
  utilisateur: jest.fn(),
  utilisateurCreer: jest.fn(),
  utilisateurModifier: jest.fn(),
  utilisateurSupprimer: jest.fn(),
  utilisateurMotDePasseModifier: jest.fn()
}))

jest.mock('../router', () => ({
  push: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.info = jest.fn()

describe("état de l'utilisateur consulté", () => {
  let store
  let actions
  let mutations
  let user

  beforeEach(() => {
    utilisateur.state = {
      current: null,
      metas: {
        permissions: [],
        entreprises: [],
        administrations: []
      }
    }
    user = {
      namespaced: true,
      state: {
        current: {}
      },
      actions: {
        logout: jest.fn()
      },
      mutations: {
        set: jest.fn()
      }
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupClose: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupLoad: jest.fn()
    }

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn()
    }
    store = new Vuex.Store({
      modules: { utilisateur, user },
      mutations,
      actions
    })
  })

  test('récupère les métas pour éditer un utilisateur', async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue({
      permissions: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      entreprises: { elements: ['ent-1'] }
    })

    await store.dispatch('utilisateur/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateur.metas).toEqual({
      permissions: [
        { id: 'w', nom: 'granulats' },
        { id: 'c', nom: 'carrières' }
      ],
      entreprises: ['ent-1'],
      administrations: []
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasUtilisateur.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('utilisateur/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api répond null", async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue(null)

    await store.dispatch('utilisateur/metasGet')

    expect(apiMock).toHaveBeenCalled()
  })

  test("obtient les données d'un utilisateur", async () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    const apiMock = api.utilisateur.mockResolvedValue(utilisateur)
    await store.dispatch('utilisateur/get', 71)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.utilisateur.current).toEqual(utilisateur)
  })

  test("n'obtient pas d'utilisateur: il n'existe pas", async () => {
    const apiMock = api.utilisateur.mockResolvedValue(null)
    await store.dispatch('utilisateur/get', 71)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.utilisateur.current).toBeNull()
  })

  test("retourne une erreur de l'api dans l'obtention de l'utilisateur", async () => {
    const apiMock = api.utilisateur.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('utilisateur/get', 71)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'utilisateur", () => {
    store.commit('utilisateur/set', { id: 71, nom: 'toto', prenom: 'asticot' })
    store.commit('utilisateur/reset')

    expect(store.state.utilisateur.current).toBeNull()
  })

  test('ajoute un utilisateur', async () => {
    const apiMock = api.utilisateurCreer.mockResolvedValue({
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })
    await store.dispatch('utilisateur/add', {
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      utilisateur: { id: 71, nom: 'toto', prenom: 'asticot' }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test('ajoute un utilisateur (erreur API)', async () => {
    const apiMock = api.utilisateurCreer.mockRejectedValue(
      new Error('erreur API')
    )
    await store.dispatch('utilisateur/add', {
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      utilisateur: { id: 71, nom: 'toto', prenom: 'asticot' }
    })
  })

  test('modifie un utilisateur', async () => {
    user.state.current = { id: 72 }
    const apiMock = api.utilisateurModifier.mockResolvedValue({
      id: 71,
      nom: 'Asticot',
      prenom: 'Julien'
    })
    await store.dispatch('utilisateur/update', {
      id: 71,
      nom: 'Asticot',
      prenom: 'Julien'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      utilisateur: { id: 71, nom: 'Asticot', prenom: 'Julien' }
    })
    expect(actions.reload).toHaveBeenCalled()
    expect(user.mutations.set).not.toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("modifie l'utilisateur actif", async () => {
    user.state.current = { id: 71, nom: 'Ouistiti', prenom: 'Marcel' }
    const apiMock = api.utilisateurModifier.mockResolvedValue({
      id: 71,
      nom: 'Asticot',
      prenom: 'Julien'
    })
    await store.dispatch('utilisateur/update', {
      id: 71,
      nom: 'Asticot',
      prenom: 'Julien'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      utilisateur: { id: 71, nom: 'Asticot', prenom: 'Julien' }
    })
    expect(actions.reload).toHaveBeenCalled()
    expect(user.mutations.set).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test('modifie un utilisateur (erreur API)', async () => {
    const apiMock = api.utilisateurModifier.mockRejectedValue(
      new Error('erreur API')
    )
    await store.dispatch('utilisateur/update', {
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({
      utilisateur: { id: 71, nom: 'toto', prenom: 'asticot' }
    })
    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('supprime un utilisateur', async () => {
    const apiMock = api.utilisateurSupprimer.mockResolvedValue({
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })
    await store.dispatch('utilisateur/remove', 46)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 46 })
    expect(user.actions.logout).not.toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(router.push).toHaveBeenCalled()
  })

  test('supprime un utilisateur et le déconnecte', async () => {
    const apiMock = api.utilisateurSupprimer.mockResolvedValue({
      id: 71,
      nom: 'toto',
      prenom: 'asticot'
    })

    user.state.current = { id: 71 }
    await store.dispatch('utilisateur/remove', 71)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(user.actions.logout).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur de l'api dans la suppression de l'utilisateur", async () => {
    const apiMock = api.utilisateurSupprimer.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('utilisateur/remove', 46)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith({ id: 46 })
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("modifie le mot de passe d'un utilisateur", async () => {
    const apiMock = api.utilisateurMotDePasseModifier.mockResolvedValue({
      id: 46,
      mdp: 'jour',
      nom: 'jean',
      prenom: 'peuplut'
    })
    await store.dispatch('utilisateur/passwordUpdate', {
      id: 46,
      motDePasse: 'bon',
      motDePasseNouveau1: 'jour',
      motDePasseNouveau2: 'jour'
    })

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

  test("retourne une erreur de l'api lors de la modification du mot de passe", async () => {
    const apiMock = api.utilisateurMotDePasseModifier.mockRejectedValue(
      new Error("erreur dans l'api")
    )
    await store.dispatch('utilisateur/passwordUpdate', {
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
