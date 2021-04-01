import utilisateurs from './utilisateurs'
import * as api from '../api/utilisateurs'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn(),
  utilisateurMetas: jest.fn()
}))

console.info = jest.fn()

describe('liste des utilisateurs', () => {
  let store
  let actions
  let mutations

  beforeEach(() => {
    utilisateurs.state = {
      elements: [],
      total: 0,
      metas: {
        permission: [],
        administration: [],
        entreprise: []
      },
      params: [
        { id: 'noms', type: 'string' },
        { id: 'emails', type: 'string' },
        { id: 'permissionIds', type: 'strings', elements: [] },
        { id: 'administrationIds', type: 'strings', elements: [] },
        { id: 'entrepriseIds', type: 'strings', elements: [] },
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: ['nom', 'prenom', 'email', 'permission', 'lien']
        },
        {
          id: 'ordre',
          type: 'string',
          elements: ['asc', 'desc']
        }
      ],
      preferences: {
        filtres: {
          noms: '',
          emails: '',
          permissionIds: [],
          administrationIds: [],
          entrepriseIds: []
        },
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: null
        }
      },
      initialized: true
    }

    actions = {
      pageError: jest.fn(),
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessagesRemove: jest.fn(),
      popupMessageAdd: jest.fn(),
      popupClose: jest.fn()
    }

    store = createStore({
      modules: { utilisateurs },
      mutations,
      actions
    })

    const app = createApp({})
    app.use(store)
  })

  const permissions = [
    { id: 'admin', nom: 'Admin' },
    { id: 'editeur', nom: 'Éditeur' },
    { id: 'lecteur', nom: 'Lecteur' },
    { id: 'entreprise', nom: 'Entreprise' },
    { id: 'defaut', nom: 'Défaut' }
  ]

  const entreprisesElements = [
    { id: 'fr-513863217', nom: "SOCIETE GUYANAISE DES MINES D'OR (SOGUMINOR)" },
    { id: 'fr-821136710', nom: 'SASU SOFERRO (SOFERRO)' },
    { id: 'fr-402207153', nom: 'IAMGOLD FRANCE' },
    { id: 'fr-333517530', nom: 'BIJOUTERIE REUNIF' }
  ]
  const entreprises = {
    elements: entreprisesElements,
    total: 4
  }

  const administrations = {
    elements: [
      {
        id: 'dre-nouvelle-aquitaine-01',
        nom:
          "Direction régionale de l'environnement, de l'aménagement et du logement (DREAL) - Nouvelle-Aquitaine - Siège de Poitiers"
      },
      { id: 'ope-onf-973-01', nom: 'Office national des forêts' },
      { id: 'pre-97302-01', nom: 'Préfecture - Guyane' },
      {
        id: 'dre-grand-est-01',
        nom:
          "Direction régionale de l'environnement, de l'aménagement et du logement (DREAL) - Grand Est - Siège de Metz"
      }
    ]
  }

  test('initialise le composant', async () => {
    const apiMock = api.utilisateurMetas
      .mockResolvedValueOnce({
        permissions,
        entreprises,
        administrations,
        truc: [{ id: 'id-truc' }]
      })
      .mockResolvedValueOnce({})

    await store.dispatch('utilisateurs/init')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.metas).toEqual({
      permission: permissions,
      entreprise: entreprisesElements,
      administration: administrations.elements
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('utilisateurs/init')

    expect(apiMock).toHaveBeenCalledTimes(2)
    expect(store.state.utilisateurs.metas).toEqual({
      permission: permissions,
      entreprise: entreprisesElements,
      administration: administrations.elements
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.utilisateurMetas.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('utilisateurs/init')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('obtient la liste des utilisateurs', async () => {
    const elements = [{ id: 71, nom: 'toto', prenom: 'asticot' }]
    const apiMock = api.utilisateurs.mockResolvedValue({ elements })
    store.state.utilisateurs.initialized = true

    await store.dispatch('utilisateurs/get')
    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.elements).toEqual(elements)

    expect(apiMock).toHaveBeenCalledTimes(1)

    store.commit('utilisateurs/reset')
    expect(store.state.utilisateurs.elements).toEqual([])
    expect(store.state.utilisateurs.initialized).toBeFalsy()
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    store.state.utilisateurs.initialized = true

    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.elements).toEqual([])
  })

  test("retourne une erreur si l'api retourne une erreur", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue('erreur api')
    store.state.utilisateurs.initialized = true

    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.elements).toEqual([])
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    let params = { noms: 'alpha' }
    const apiMock = api.utilisateurs.mockResolvedValue({})

    await store.dispatch('utilisateurs/preferencesSet', { section, params })

    expect(apiMock).toHaveBeenCalled()

    expect(store.state.utilisateurs.preferences.filtres.noms).toEqual('alpha')

    params = { noms: 'beta' }

    await store.dispatch('utilisateurs/preferencesSet', {
      section,
      params,
      pageReset: true
    })

    expect(store.state.utilisateurs.preferences.filtres.noms).toEqual('beta')
    expect(apiMock).toHaveBeenCalled()
  })
})
