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

  test('ajoute des métas', () => {
    store.commit('metas/set', values)

    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
  })

  test('supprime des métas', () => {
    metas.state.domaines = [{ id: 'h' }]
    store.commit('metas/set', { domaines: [] })

    expect(store.state.metas.domaines).toEqual([])
  })
})
