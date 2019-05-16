import metas from './metas'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('gère les préférences utilisateurs', () => {
  let store
  let id
  let domaines
  let user
  let actions

  beforeEach(() => {
    domaines = [{ id: 'c' }, { id: 'w' }]
    id = 'domaines'

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
            domaines: 'c,w,h',
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

  test('ajoute des metas dans le state et met à jour les préférences utilisateurs', async () => {
    await store.dispatch('metas/set', { id, values: domaines })

    expect(actions.preferenceSet).toHaveBeenCalled()
    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
  })

  test('ajoute des metas dans le state', async () => {
    user.state.preferences.filtres.domaines = ''
    await store.dispatch('metas/set', { id, values: domaines })

    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
  })

  test('retire des metas du state', async () => {
    metas.state.domaines = [{ id: 'h' }]
    await store.dispatch('metas/set', { id, values: [] })

    expect(store.state.metas.domaines).toEqual([])
  })

  test('ajoute des metas dans le state (sans incidence sur les préférences utilisateurs)', async () => {
    await store.dispatch('metas/set', {
      id: 'devises',
      values: [{ id: 'euro' }]
    })

    expect(store.state.metas.devises).toEqual([{ id: 'euro' }])
  })
})
