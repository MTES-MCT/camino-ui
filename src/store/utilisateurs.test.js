import utilisateurs from './utilisateurs'
import { createApp } from 'vue'
import { createStore } from 'vuex'

jest.mock('../api/utilisateurs', () => ({
  utilisateurs: jest.fn(),
  utilisateurMetas: jest.fn()
}))

console.info = jest.fn()

describe('liste des utilisateurs', () => {
  let store

  beforeEach(() => {
    utilisateurs.state = {
      metas: {
        permission: [],
        administration: [],
        entreprise: []
      },
      definitions: [
        { id: 'permissionIds', type: 'strings', values: [] },
        { id: 'administrationIds', type: 'strings', values: [] },
        { id: 'entrepriseIds', type: 'strings', values: [] }
      ]
    }

    store = createStore({
      modules: {
        utilisateurs,
        titre: {
          namespaced: true,
          actions: {
            openTab: jest.fn()
          }
        }
      }
    })

    const app = createApp({})
    app.use(store)
  })

  test('enregistre les métas', () => {
    const permissions = [
      { id: 'admin', nom: 'Admin' },
      { id: 'editeur', nom: 'Éditeur' }
    ]

    const entreprisesElements = [
      {
        id: 'fr-513863217',
        nom: "SOCIETE GUYANAISE DES MINES D'OR (SOGUMINOR)"
      },
      { id: 'fr-821136710', nom: 'SASU SOFERRO (SOFERRO)' }
    ]
    const entreprises = {
      elements: entreprisesElements,
      total: 4
    }

    const administrations = {
      elements: [
        {
          id: 'dre-nouvelle-aquitaine-01',
          nom: "Direction régionale de l'environnement, de l'aménagement et du logement (DREAL) - Nouvelle-Aquitaine - Siège de Poitiers"
        },
        { id: 'ope-onf-973-01', nom: 'Office national des forêts' }
      ]
    }
    store.commit('utilisateurs/metasSet', {
      permissions,
      entreprises,
      administrations,
      truc: {}
    })

    expect(store.state.utilisateurs.metas).toEqual({
      permission: permissions,
      entreprise: entreprises.elements,
      administration: administrations.elements
    })

    expect(store.state.utilisateurs.definitions).toEqual([
      { id: 'permissionIds', type: 'strings', values: ['admin', 'editeur'] },
      {
        id: 'administrationIds',
        type: 'strings',
        values: ['dre-nouvelle-aquitaine-01', 'ope-onf-973-01']
      },
      {
        id: 'entrepriseIds',
        type: 'strings',
        values: ['fr-513863217', 'fr-821136710']
      }
    ])
  })
})
