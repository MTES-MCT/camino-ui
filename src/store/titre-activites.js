import { activiteModifier } from '../api/activites'

export const actions = {
  async update({ commit, dispatch, rootState }, activite) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreActiviteUpdate', { root: true })

    try {
      const data = await activiteModifier({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          activiteStatutId: activite.statut.id
        }
      })

      commit('popupClose', null, { root: true })
      dispatch(
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
      await dispatch(
        'reload',
        { name: 'titre', id: rootState.titre.current.id },
        { root: true }
      )
      dispatch(
        'messageAdd',
        { value: `le titre a été mis à jour`, type: 'success' },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreActiviteUpdate', { root: true })
    }
  }
}

export const mutations = {}

export default {
  namespaced: true,
  actions,
  mutations
}
