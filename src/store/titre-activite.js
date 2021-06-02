import {
  activite,
  activiteModifier,
  activiteSupprimer
} from '../api/titres-activites'

const state = {
  element: null,
  opened: false
}

const actions = {
  async get({ commit, dispatch }, id) {
    commit('loadingAdd', 'activiteGet', { root: true })

    try {
      const data = await activite({ id })

      if (data) {
        commit('set', data)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'activiteGet', { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, { activite, route, depose }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'activiteUpdate', { root: true })
      const data = await activiteModifier({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          documents: activite.documents
        },
        depose
      })

      if (route) {
        commit('popupClose', null, { root: true })

        await dispatch(
          'messageAdd',
          {
            value:
              data.statut.id === 'dep'
                ? `l'activité a été validée`
                : `l'activité a été enregistrée`,
            type: 'success'
          },
          { root: true }
        )

        if (route.name === 'titre') {
          commit(
            'titre/open',
            { section: 'activites', id: activite.id },
            { root: true }
          )
        } else {
          commit('open')
        }
        await dispatch('reload', route, { root: true })
      }

      return 'success'
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'activiteUpdate', { root: true })
    }
  },

  async remove({ commit, dispatch }, { id, route }) {
    try {
      commit('popupMessagesRemove', null, { root: true })
      commit('popupLoad', null, { root: true })
      commit('loadingAdd', 'activiteRemove', { root: true })
      const data = await activiteSupprimer({ id })

      commit('popupClose', null, { root: true })
      if (route.name === 'titre') {
        await dispatch(
          'reload',
          { name: 'titre', id: route.id },
          { root: true }
        )
      } else if (route.name === 'titreActivite') {
        await dispatch('reload', { name: 'activites' }, { root: true })
      }

      dispatch(
        'messageAdd',
        { value: `l'activité à été supprimée`, type: 'success' },
        { root: true }
      )

      return data
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'activiteRemove', { root: true })
    }
  }
}

const mutations = {
  set(state, entreprise) {
    state.element = entreprise
  },

  reset(state) {
    state.element = null
  },

  open(state) {
    if (!state.opened) {
      state.opened = true
    }
  },

  close(state) {
    if (state.opened) {
      state.opened = false
    }
  },

  toggle(state) {
    if (state.opened) {
      state.opened = false
    } else {
      state.opened = true
    }
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
