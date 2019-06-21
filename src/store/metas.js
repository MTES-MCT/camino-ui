import Vue from 'vue'

// trouve les filtres actifs dans les préférences utilisateurs
const idsFiltreFind = (idsFiltre, idsState, idsResponse) => {
  // ids qui ont été supprimées des metas
  const idsRemoved = idsState.filter(idState => !idsResponse.includes(idState))

  // ne conserve que les ids ids qui ont été supprimées des metas
  return idsFiltre.filter(idFiltre => !idsRemoved.includes(idFiltre))
}

export const state = {
  types: [],
  domaines: [],
  statuts: []
}

export const actions = {}

export const getters = {}

export const mutations = {
  set(state, response) {
    Object.keys(response).forEach(id => {
      Vue.set(state, id, response[id])
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
