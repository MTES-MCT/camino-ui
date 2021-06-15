import { activite, activiteModifier } from '../api/titres-activites'
import { documentsRequiredAdd } from '../utils/documents'
import router from '../router'

const state = {
  element: null
}

const actions = {
  async init({ commit, dispatch }, id) {
    commit('loadingAdd', 'activiteEditionInit', { root: true })

    try {
      const data = await activite({ id })

      if (data) {
        commit('set', data)
        await dispatch('documentInit', state.element.documents)
      } else {
        dispatch('pageError', null, { root: true })
      }
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'activiteEditionInit', { root: true })
    }
  },

  async update({ commit, dispatch, rootState }, activite) {
    try {
      commit('loadingAdd', 'activiteUpdate', { root: true })
      await activiteModifier({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          documentIds: activite.documents
            ?.filter(d => d.id !== d.type.id)
            .map(({ id }) => id)
        }
      })

      await router.back()

      await dispatch(
        'messageAdd',
        {
          value: `l'activité a été enregistrée`,
          type: 'success'
        },
        { root: true }
      )
    } catch (e) {
      dispatch('apiError', e, { root: true })
    } finally {
      commit('loadingRemove', 'activiteUpdate', { root: true })
    }
  },

  async documentInit({ state, commit, rootGetters }, documents) {
    const documentsTypes = state.element.type.documentsTypes

    const newDocuments = documentsRequiredAdd(
      documents,
      documentsTypes,
      rootGetters['user/userIsAdmin']
    )

    commit('documentsSet', newDocuments)
  },

  async documentAdd({ state, dispatch }, { document, idOld }) {
    const documents = state.element.documents || []
    if (idOld) {
      const index = documents.findIndex(({ id }) => id === idOld)
      documents[index] = document
    } else {
      documents.push(document)
    }

    await dispatch('documentInit', documents)
  },

  async documentRemove({ state, dispatch }, { id }) {
    await dispatch(
      'documentInit',
      state.element.documents.filter(d => d.id !== id)
    )
  }
}

const mutations = {
  set(state, activite) {
    activite.contenu = activite.sections?.reduce((sections, s) => {
      sections[s.id] = s.elements.reduce((elements, e) => {
        const value =
          activite.contenu &&
          activite.contenu[s.id] &&
          activite.contenu[s.id][e.id]

        elements[e.id] = value || e.type !== 'checkboxes' ? value : []

        return elements
      }, {})

      return sections
    }, {})

    state.element = activite
  },

  documentsSet(state, documents) {
    state.element.documents = documents
  },

  reset(state) {
    state.element = null
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
