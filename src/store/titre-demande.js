import { titreDemandeCreer } from '../api/titre-demande'
import router from '../router'

const actions = {
  async save({ commit, dispatch }, titreDemande) {
    try {
      commit('loadingAdd', 'titreDemandeAdd', { root: true })

      const data = await titreDemandeCreer({ titreDemande })

      router.push({ name: 'titre', params: { id: data.titreId } })
      dispatch(
        'messageAdd',
        {
          value: 'la demande de titre a été créée',
          type: 'success'
        },
        { root: true }
      )
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
