import administration from './administration'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as api from '../api/administrations'

jest.mock('../api/administrations', () => ({
  administration: jest.fn(),
  administrationMetas: jest.fn(),
  administrationModifier: jest.fn(),
  administrationPermissionsMetas: jest.fn(),
  administrationTitreTypeUpdate: jest.fn(),
  administrationTitreTypeTitreStatutUpdate: jest.fn(),
  administrationTitreTypeEtapeTypeUpdate: jest.fn(),
  administrationActiviteTypeUpdate: jest.fn()
}))

console.info = jest.fn()

describe("état de l'administration consultée", () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    administration.state = {
      element: null,
      metas: {
        types: [],
        regions: [],
        departements: [],
        domaines: [],
        titresStatuts: [],
        etapesTypes: []
      }
    }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupLoad: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupClose: jest.fn(),
      popupMessageAdd: jest.fn(),
      messageAdd: jest.fn()
    }
    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      reload: jest.fn(),
      messageAdd: jest.fn()
    }
    store = createStore({
      modules: { administration },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  test("obtient les données d'un administration", async () => {
    const administration = { id: 71, nom: 'toto' }
    const apiMock = api.administration.mockResolvedValue(administration)
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(store.state.administration.element).toEqual(administration)
  })

  test("retourne une erreur de l'api dans l'obtention de l'administration", async () => {
    const apiMock = api.administration.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('administration/get', 71)

    expect(apiMock).toHaveBeenCalledWith({ id: 71 })
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'administration", () => {
    store.commit('administration/set', { id: 71, nom: 'toto' })
    store.commit('administration/reset')

    expect(store.state.administration.element).toBeNull()
  })

  test('récupère les métas pour éditer une administration', async () => {
    const apiMock = api.administrationMetas.mockResolvedValue({
      administrationsTypes: [
        { id: 'admin-1', nom: 'Opérateur' },
        { id: 'admin-2', nom: 'Déal' }
      ],
      regions: [
        { id: 1, nom: 'région 1' },
        { id: 2, nom: 'région 2' }
      ],
      departements: [
        { id: 1, nom: 'département 1' },
        { id: 2, nom: 'département 2' }
      ]
    })

    await store.dispatch('administration/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administration.metas).toEqual({
      types: [
        { id: 'admin-1', nom: 'Opérateur' },
        { id: 'admin-2', nom: 'Déal' }
      ],
      regions: [
        { id: 1, nom: 'région 1' },
        { id: 2, nom: 'région 2' }
      ],
      departements: [
        { id: 1, nom: 'département 1' },
        { id: 2, nom: 'département 2' }
      ],
      domaines: [],
      titresStatuts: [],
      etapesTypes: []
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la récupération des métas", async () => {
    const apiMock = api.administrationMetas.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/init')

    expect(apiMock).toHaveBeenCalled()

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('modifie une administration', async () => {
    const apiMock = api.administrationModifier.mockResolvedValue({
      id: 71,
      nom: 'nom admin'
    })

    await store.dispatch('administration/update', { id: 71, nom: 'nom admin' })

    expect(apiMock).toHaveBeenCalledWith({
      administration: { nom: 'nom admin', id: 71 }
    })
    expect(mutations.popupClose).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification d'une administration", async () => {
    const apiMock = api.administrationModifier.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/update', { id: 71, nom: 'nom admin' })

    expect(apiMock).toHaveBeenCalledWith({
      administration: { nom: 'nom admin', id: 71 }
    })

    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('récupère les métas pour éditer les permissions', async () => {
    const apiMock = api.administrationPermissionsMetas.mockResolvedValue({
      domaines: [{ id: 'm', nom: 'minéraux et métaux' }],
      statuts: [{ id: 'val', nom: 'valide' }],
      etapesTypes: [{ id: 'dex', nom: 'décision expresse' }]
    })

    await store.dispatch('administration/permissionsInit')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.administration.metas).toEqual({
      types: [],
      regions: [],
      departements: [],
      domaines: [{ id: 'm', nom: 'minéraux et métaux' }],
      titresStatuts: [{ id: 'val', nom: 'valide' }],
      etapesTypes: [{ id: 'dex', nom: 'décision expresse' }]
    })

    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la récupération des métas", async () => {
    const apiMock = api.administrationPermissionsMetas.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/permissionsInit')

    expect(apiMock).toHaveBeenCalled()

    expect(mutations.messageAdd).toHaveBeenCalled()
  })

  test('modifie les permissions (type de titres)', async () => {
    const apiMock = api.administrationTitreTypeUpdate.mockResolvedValue({
      id: 71,
      nom: 'nom admin'
    })

    await store.dispatch('administration/titreTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      gestionnaire: true,
      associee: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        gestionnaire: true,
        associee: true
      }
    })

    expect(actions.reload).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification des permissions (type de titre)", async () => {
    const apiMock = api.administrationTitreTypeUpdate.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/titreTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      gestionnaire: true,
      associee: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        gestionnaire: true,
        associee: true
      }
    })

    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.messageAdd).toHaveBeenCalled()
  })

  test('modifie les permissions (type de titres / statut de titre)', async () => {
    const apiMock = api.administrationTitreTypeTitreStatutUpdate.mockResolvedValue(
      {
        id: 71,
        nom: 'nom admin'
      }
    )

    await store.dispatch('administration/titreTypeTitreStatutUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      titreStatutId: 'dex',
      titresModificationInterdit: true,
      demarchesModificationInterdit: true,
      etapesModificationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreTypeTitreStatut: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        titreStatutId: 'dex',
        titresModificationInterdit: true,
        demarchesModificationInterdit: true,
        etapesModificationInterdit: true
      }
    })

    expect(actions.reload).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification des permissions (type de titre / statut de titre)", async () => {
    const apiMock = api.administrationTitreTypeTitreStatutUpdate.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/titreTypeTitreStatutUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      titreStatutId: 'dex',
      titresModificationInterdit: true,
      demarchesModificationInterdit: true,
      etapesModificationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreTypeTitreStatut: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        titreStatutId: 'dex',
        titresModificationInterdit: true,
        demarchesModificationInterdit: true,
        etapesModificationInterdit: true
      }
    })

    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.messageAdd).toHaveBeenCalled()
  })

  test("modifie les permissions (type de titre / type d'étape)", async () => {
    const apiMock = api.administrationTitreTypeEtapeTypeUpdate.mockResolvedValue(
      {
        id: 71,
        nom: 'nom admin'
      }
    )

    await store.dispatch('administration/titresTypeEtapeTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      etapeTypeId: 'dex',
      lectureInterdit: true,
      modificationInterdit: true,
      creationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreTypeEtapeType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        etapeTypeId: 'dex',
        lectureInterdit: true,
        modificationInterdit: true,
        creationInterdit: true
      }
    })

    expect(actions.reload).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification des permissions (type de titre / type d'étape)", async () => {
    const apiMock = api.administrationTitreTypeEtapeTypeUpdate.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/titresTypeEtapeTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'aex',
      etapeTypeId: 'dex',
      lectureInterdit: true,
      modificationInterdit: true,
      creationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationTitreTypeEtapeType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'aex',
        etapeTypeId: 'dex',
        lectureInterdit: true,
        modificationInterdit: true,
        creationInterdit: true
      }
    })

    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.messageAdd).toHaveBeenCalled()
  })

  test('modifie les restrictions (type des activités)', async () => {
    const apiMock = api.administrationActiviteTypeUpdate.mockResolvedValue({
      id: 71,
      nom: 'nom admin'
    })

    await store.dispatch('administration/activiteTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'grp',
      lectureInterdit: true,
      modificationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationActiviteType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'grp',
        lectureInterdit: true,
        modificationInterdit: true
      }
    })

    expect(actions.reload).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'API retourne une erreur lors de la modification des permissions (type de titre)", async () => {
    const apiMock = api.administrationActiviteTypeUpdate.mockRejectedValue(
      new Error('erreur api')
    )

    await store.dispatch('administration/activiteTypeUpdate', {
      administrationId: 'dea-guyane',
      titreTypeId: 'grp',
      lectureInterdit: true,
      modificationInterdit: true
    })

    expect(apiMock).toHaveBeenCalledWith({
      administrationActiviteType: {
        administrationId: 'dea-guyane',
        titreTypeId: 'grp',
        lectureInterdit: true,
        modificationInterdit: true
      }
    })

    expect(actions.reload).not.toHaveBeenCalled()
    expect(mutations.messageAdd).toHaveBeenCalled()
  })
})
