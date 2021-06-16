import { utilisateurs, utilisateurMetas } from '../api/utilisateurs'
import { listeActionsBuild, listeMutations } from './_liste-build'

const state = {
  elements: [],
  total: 0,
  metas: {
    permission: [],
    administration: [],
    entreprise: []
  },
  definitions: [
    { id: 'noms', type: 'string' },
    { id: 'emails', type: 'string' },
    { id: 'permissionIds', type: 'strings', values: [] },
    { id: 'administrationIds', type: 'strings', values: [] },
    { id: 'entrepriseIds', type: 'strings', values: [] },
    { id: 'page', type: 'number', min: 0 },
    { id: 'intervalle', type: 'number', min: 10, max: 500 },
    {
      id: 'colonne',
      type: 'string',
      values: ['nom', 'prenom', 'email', 'permission', 'lien']
    },
    {
      id: 'ordre',
      type: 'string',
      values: ['asc', 'desc']
    }
  ],
  params: {
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
  initialized: false,
  useUrl: true
}

const actions = listeActionsBuild(
  'utilisateurs',
  'utilisateurs',
  utilisateurs,
  utilisateurMetas
)

const mutations = Object.assign({}, listeMutations, {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      let metaId
      let paramId
      if (id === 'permissions') {
        metaId = 'permission'
        paramId = 'permissionIds'
      } else if (id === 'entreprises') {
        metaId = 'entreprise'
        paramId = 'entrepriseIds'

        // l'API renvoie les entreprises dans une propriété 'elements'
        data[id] = data[id].elements
      } else if (id === 'administrations') {
        metaId = 'administration'
        paramId = 'administrationIds'

        data[id] = data[id].elements
      }

      if (metaId) {
        state.metas[metaId] = data[id]
      }

      if (paramId) {
        const definition = state.definitions.find(p => p.id === paramId)

        definition.values = data[id].map(e => e.id)
      }
    })
  }
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
