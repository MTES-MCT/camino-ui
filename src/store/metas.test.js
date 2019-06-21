import metas from './metas'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('état de la liste des métas', () => {
  let store
  let values
  let user
  let actions

  beforeEach(() => {
    values = { domaines: [{ id: 'c' }, { id: 'w' }] }

    metas.state = {
      types: [],
      domaines: [{ id: 'h' }],
      statuts: []
    }

    actions = {
      preferenceSet: jest.fn()
    }

    user = {
      namespaced: true,
      state: {
        preferences: {
          filtres: {
            domaines: 'h',
            statuts: 'val',
            types: null
          }
        }
      },
      actions
    }

    store = new Vuex.Store({
      modules: { metas, user }
    })
  })

  test('ajoute des métas et met à jour des préférences utilisateurs', async () => {
    await store.dispatch('metas/set', values)

    expect(actions.preferenceSet).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
  })

  test('ajoute des métas et ne met à jour pas à jour les préférences utilisateurs', async () => {
    await store.dispatch('metas/set', {
      domaines: [{ id: 'h' }]
    })

    expect(actions.preferenceSet).not.toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([{ id: 'h' }])
  })

  test('ajoute des métas', async () => {
    user.state.preferences.filtres.domaines = ''
    await store.dispatch('metas/set', values)

    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
  })

  test('supprime des métas', async () => {
    metas.state.domaines = [{ id: 'h' }]
    await store.dispatch('metas/set', { domaines: [] })

    expect(store.state.metas.domaines).toEqual([])
  })

  test('ajoute des metas (sans incidence sur les préférences utilisateurs)', async () => {
    await store.dispatch('metas/set', {
      devises: [{ id: 'euro' }]
    })

    expect(store.state.metas.devises).toEqual([{ id: 'euro' }])
  })
})
