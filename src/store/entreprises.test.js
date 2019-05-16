import entreprises from './entreprises'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe("état de la liste d'entreprises", () => {
  test('ajoute des entreprises et les tri par ordre alphabétique', () => {
    const entreprisesListe = [
      { nom: 'Petite Souris' },
      'Koala',
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' }
    ]
    entreprises.state = { current: null, list: [] }
    const store = new Vuex.Store({ modules: { entreprises } })
    store.commit('entreprises/set', entreprisesListe)

    expect(store.state.entreprises.list).toEqual([
      { nom: 'Canard' },
      { nom: 'Monstres & Cie' },
      { nom: 'Petite Souris' },
      'Koala'
    ])
  })
})
