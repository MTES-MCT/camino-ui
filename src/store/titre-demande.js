import { titreDemandeCreer } from '../api/titre-demande'
import router from '../router'
import { titreMetas } from '../api/titres'

const state = {
  metas: {
    referencesTypes: []
  }
}

const actions = {
  async init({ commit }) {
    commit('loadingAdd', 'titreDemandeInit', { root: true })

    try {
      const data = await titreMetas()

      commit('metasSet', { referencesTypes: data })
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreDemandeInit', { root: true })
    }
  },

  async save({ commit, dispatch }, titreDemande) {
    try {
      commit('loadingAdd', 'titreDemandeAdd', { root: true })

      if (titreDemande.references) {
        titreDemande.references = titreDemande.references.filter(
          reference => reference.nom
        )
      }

      const data = await titreDemandeCreer({ titreDemande })

      await router.push({
        name: 'etape-edition',
        params: { id: data.titreEtapeId }
      })

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

const mutations = {
  metasSet(state, data) {
    Object.keys(data).forEach(id => {
      state.metas[id] = data[id]
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
