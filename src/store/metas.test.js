import metas from './metas'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('teste les metas et les preferences utilisateurs', () => {
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
      domaines: [],
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
            domaines: 'c,w',
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

  test('les preferences utilisateurs sont correctement modifiés', async () => {
    await store.dispatch('metas/set', { id, values: domaines })

    expect(store.state.metas.domaines).toEqual([{ id: 'c' }, { id: 'w' }])
    expect(actions.preferenceSet).toHaveBeenCalled()
  })

  test('ajoute des elements dans les metas', () => {
    store.commit('metas/set', { id, values: domaines })

    expect(store.state.metas).toEqual({
      types: [],
      domaines: [{ id: 'c' }, { id: 'w' }],
      statuts: []
    })
  })
})
