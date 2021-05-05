import { titreDemandeCreer } from '../api/titre-demande'

const actions = {
  async save({ commit, dispatch }, titreDemande) {
    try {
      commit('loadingAdd', 'titreDemandeAdd', { root: true })
      const data = await titreDemandeCreer({ titreDemande })

      console.log(data)
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemandeAdd', { root: true })
    }
  }
}

export default {
  namespaced: true,
  actions
}
