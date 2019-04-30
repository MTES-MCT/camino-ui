import titre from './titre'
import * as Vue from 'vue'
import * as api from '../api/titres'

jest.mock('../api/titres', () => ({
  titre: jest.fn(),
  titreEtapeUpdate: jest.fn()
}))

jest.mock('vue', () => ({
  set: jest.fn(),
  delete: jest.fn()
}))

describe('tests sur actions', () => {
  test('get: le tire existe', async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const id = 31
    const apiSpy = api.titre.mockImplementation(async id => returnVariable)
    await titre.actions.get({ commit: commitSpy, dispatch: dispatchSpy }, id)
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(0)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(id)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'titre', {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'set', returnVariable)
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'loadingRemove', 'titre', {
      root: true
    })
  })
  test("get: le tire n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const id = 31
    const apiSpy = api.titre.mockImplementation(async id => returnVariable)
    await titre.actions.get({ commit: commitSpy, dispatch: dispatchSpy }, id)
    expect(commitSpy).toHaveBeenCalledTimes(2)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(id)
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadingAdd', 'titre', {
      root: true
    })
    expect(dispatchSpy).toHaveBeenCalledWith('pageError', null, { root: true })
    expect(commitSpy).toHaveBeenNthCalledWith(2, 'loadingRemove', 'titre', {
      root: true
    })
  })
  test('etapeUpdate: mise a jour reussie', async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = true
    const etape = 31
    const apiSpy = api.titreEtapeUpdate.mockImplementation(
      async ({ etape }) => returnVariable
    )
    await titre.actions.etapeUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      etape
    )
    expect(commitSpy).toHaveBeenCalledTimes(4)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ etape })
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, 'reload')
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'titreEtapeUpdate',
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(3, 'popupClose', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      4,
      'loadingRemove',
      'titreEtapeUpdate',
      {
        root: true
      }
    )
  })

  test("etapeUpdate: l'etape du titre n'existe pas", async () => {
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()
    const returnVariable = false
    const etape = 31
    const apiSpy = api.titreEtapeUpdate.mockImplementation(
      async ({ etape }) => returnVariable
    )
    await titre.actions.etapeUpdate(
      { commit: commitSpy, dispatch: dispatchSpy },
      etape
    )
    expect(commitSpy).toHaveBeenCalledTimes(3)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith({ etape })
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, 'pageError', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(1, 'popupMessagesRemove', null, {
      root: true
    })
    expect(commitSpy).toHaveBeenNthCalledWith(
      2,
      'loadingAdd',
      'titreEtapeUpdate',
      {
        root: true
      }
    )
    expect(commitSpy).toHaveBeenNthCalledWith(
      3,
      'loadingRemove',
      'titreEtapeUpdate',
      {
        root: true
      }
    )
  })

  test('documentSelect: bon document a selectionner', () => {
    const commitSpy = jest.fn()
    const documentId = 12
    const selected = true
    titre.actions.documentSelect(
      { commit: commitSpy },
      { documentId, selected }
    )
    expect(commitSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenCalledWith('documentSelectionAdd', documentId)
  })
  test('documentSelect: mauvais document selectionne', () => {
    const commitSpy = jest.fn()
    const documentId = 12
    const selected = false
    titre.actions.documentSelect(
      { commit: commitSpy },
      { documentId, selected }
    )
    expect(commitSpy).toHaveBeenCalledTimes(1)
    expect(commitSpy).toHaveBeenCalledWith(
      'documentSelectionRemove',
      documentId
    )
  })
})

describe('tests sur getters', () => {
  test('documentsTotal: current state is null', () => {
    const state = {
      current: null,
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(0)
  })
  test('documentsTotal: pas de demarches', () => {
    const state = {
      current: { démarches: null },
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(0)
  })
  test('documentsTotal: obtient le nombre de documents exact', () => {
    const state = {
      current: {
        démarches: {
          m: [{ documents: [1, 2, 3] }],
          h: [{ documents: [] }],
          w: []
        }
      },
      documents: []
    }
    const result = titre.getters.documentsTotal(state)
    expect(result).toEqual(3)
  })

  test('documentSelected: fonctionne correctement', () => {
    const state = {
      current: null,
      documents: [12]
    }
    const result = titre.getters.documentSelected(state)(12)
    expect(result).toBeDefined()
  })
  test('documentSelected: pas de resultats dans les documents', () => {
    const state = {
      current: null,
      documents: [12]
    }
    const result = titre.getters.documentSelected(state)(11)
    expect(result).toBeUndefined()
  })
})

describe('affichage de la vue utilisateur', () => {
  test('la vue se set correctement', () => {
    const titreId = 12
    const apiSpy = Vue.set.mockImplementation((state, current, titreId) => true)
    titre.mutations.set('state', titreId)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'current', titreId)
  })
  test('la vue se reset correctement', () => {
    const apiSpy = Vue.set.mockImplementation((state, current, titreId) => true)
    titre.mutations.reset('state')
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('state', 'current', null)
  })
  test('on ajoute un utilisateur', () => {
    const state = { documents: [] }
    titre.mutations.documentSelectionAdd(state, 12)
    expect(state.documents).toHaveLength(1)
    expect(state.documents).toMatchObject([12])
  })
  test('on enleve un utilisateur qui se trouve dans la liste', () => {
    const state = { documents: [12, 54, 213] }
    const apiSpy = Vue.delete.mockImplementation((documents, index) => true)
    titre.mutations.documentSelectionRemove(state, 54)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(state.documents, 1)
  })
  test('on enleve un utilisateur inexistant', () => {
    const state = { documents: [12, 54, 213] }
    titre.mutations.documentSelectionRemove(state, 88)
    const apiSpy = Vue.delete.mockImplementation((documents, index) => true)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith(state.documents, -1)
  })
})
