import { createLocalVue } from '@vue/test-utils'

import substances from './substances'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('substances', () => {
  let store
  let values

  beforeEach(() => {
    substances.state = { list: [] }
    values = ['165', '6513', '21']
    store = new Vuex.Store({ modules: { substances } })
  })

  test('ajoute des substances (actions)', async () => {
    await store.dispatch('substances/set', values)
    expect(store.state.substances.list).toEqual(values)
  })

  test('ajoute des substances (mutations)', () => {
    store.commit('substances/set', values)
    expect(store.state.substances.list).toEqual(values)
  })
})
