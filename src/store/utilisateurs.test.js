import utilisateurs from './utilisateurs'
import * as api from '../api/utilisateurs'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn(),
  metasUtilisateur: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.info = jest.fn()

describe('liste des utilisateurs', () => {
  let store
  let actions
  let mutations
  beforeEach(() => {
    utilisateurs.state = {
      list: [],
      total: null,
      metas: {
        permission: [],
        administrationFiltre: [],
        entrepriseFiltre: []
      },
      params: [
        { id: 'noms', type: 'string' },
        { id: 'prenoms', type: 'string' },
        { id: 'emails', type: 'string' },
        { id: 'permissionIds', type: 'strings', elements: [] },
        { id: 'administrationFiltreIds', type: 'strings', elements: [] },
        { id: 'entrepriseFiltreIds', type: 'strings', elements: [] },
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
        table: {
          page: 1,
          intervalle: 200,
          ordre: 'asc',
          colonne: null
        },
        filtres: {
          noms: '',
          prenoms: '',
          emails: '',
          permissionIds: [],
          administrationFiltreIds: [],
          entrepriseFiltreIds: []
        }
      }
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
    store = new Vuex.Store({
      modules: { utilisateurs },
      mutations,
      actions
    })
  })

  const permissions = [
    {
      id: 'admin',
      nom: 'Admin'
    },
    {
      id: 'editeur',
      nom: 'Éditeur'
    },
    {
      id: 'lecteur',
      nom: 'Lecteur'
    },
    {
      id: 'entreprise',
      nom: 'Entreprise'
    },
    {
      id: 'defaut',
      nom: 'Défaut'
    }
  ]

  const entreprises = [
    {
      id: 'fr-513863217',
      nom: "SOCIETE GUYANAISE DES MINES D'OR (SOGUMINOR)"
    },
    {
      id: 'fr-821136710',
      nom: 'SASU SOFERRO (SOFERRO)'
    },
    {
      id: 'fr-402207153',
      nom: 'IAMGOLD FRANCE'
    },
    {
      id: 'fr-333517530',
      nom: 'BIJOUTERIE REUNIF'
    }
  ]

  const administrations = [
    {
      id: 'dre-nouvelle-aquitaine-01',
      nom:
        "Direction régionale de l'environnement, de l'aménagement et du logement (DREAL) - Nouvelle-Aquitaine - Siège de Poitiers"
    },
    {
      id: 'ope-onf-973-01',
      nom: 'Office national des forêts'
    },
    {
      id: 'pre-97302-01',
      nom: 'Préfecture - Guyane'
    },
    {
      id: 'dre-grand-est-01',
      nom:
        "Direction régionale de l'environnement, de l'aménagement et du logement (DREAL) - Grand Est - Siège de Metz"
    }
  ]

  test('récupère les métas pour afficher les utilisateurs', async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue({
      permissions,
      entreprises,
      administrations
    })

    await store.dispatch('utilisateurs/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.metas).toEqual({
      permission: permissions,
      entrepriseFiltre: entreprises,
      administrationFiltre: administrations
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("ne récupère pa les métas si l'api ne les renvoie pas", async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue({
      permission: permissions,
      entrepriseFiltre: entreprises,
      administrationFiltre: administrations
    })

    await store.dispatch('utilisateurs/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.metas).toEqual({
      permission: [],
      administrationFiltre: [],
      entrepriseFiltre: []
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasUtilisateur.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('utilisateurs/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api répond null", async () => {
    const apiMock = api.metasUtilisateur.mockResolvedValue(null)

    await store.dispatch('utilisateurs/metasGet')

    expect(apiMock).toHaveBeenCalled()
  })

  test('obtient la liste des utilisateurs', async () => {
    const apiMock = api.utilisateurs.mockResolvedValue({
      utilisateurs: [{ id: 71, nom: 'toto', prenom: 'asticot' }],
      total: 1
    })
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([
      { id: 71, nom: 'toto', prenom: 'asticot' }
    ])
  })

  test("retourne une erreur 404 si l'api retourne null", async () => {
    const apiMock = api.utilisateurs.mockResolvedValue(null)
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.utilisateurs.list).toEqual([])
  })

  test("retourne une erreur de l'api dans l'obtention des utilisateurs", async () => {
    const apiMock = api.utilisateurs.mockRejectedValue(new Error('erreur api'))
    await store.dispatch('utilisateurs/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { permissionsIds: 'admin' }
    await store.dispatch('utilisateurs/preferencesSet', { section, params })

    expect(store.state.utilisateurs.preferences.filtres.permissionsIds).toEqual(
      'admin'
    )
  })
})
