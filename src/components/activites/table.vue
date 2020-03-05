<template>
  <Table
    :rows="lignes"
    :columns="colonnes"
    :params="params"
    @params:update="preferencesUpdate"
  />
</template>

<script>
import Table from '../_ui/table.vue'
import List from '../_ui/list.vue'
import Statut from '../_common/statut.vue'

export default {
  name: 'ActivitesTable',

  components: {
    Table
  },

  props: {
    activites: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'titre',
          name: 'Titre'
        },
        {
          id: 'titulaires',
          name: 'Titulaires',
          class: ['min-width-10']
        },
        {
          id: 'periode',
          name: 'Période'
        },
        {
          id: 'statut',
          name: 'Statut',
          class: ['min-width-5']
        }
      ],
      preferences: {
        intervalle: 200,
        page: 1,
        ordre: 'asc',
        colonne: 'titre'
      }
    }
  },

  computed: {
    params() {
      return Object.keys(this.preferences).reduce((params, id) => {
        if (id === 'intervalle') {
          params.range = this.preferences.intervalle
        } else if (id === 'ordre') {
          params.order = this.preferences.ordre
        } else if (id === 'colonne') {
          params.column = this.preferences.colonne
        } else {
          params[id] = this.preferences[id]
        }

        return params
      }, {})
    },
    lignes() {
      return this.activites.map(activite => {
        const columns = {
          titre: { value: activite.titre.nom },
          titulaires: {
            component: List,
            props: {
              elements: activite.titre.titulaires.map(({ nom }) => nom),
              mini: true
            },
            class: 'mb--xs',
            value: activite.titre.titulaires.map(({ nom }) => nom).join(', ')
          },
          periode: { value: activite.periode.nom },
          statut: {
            component: Statut,
            props: {
              color: `bg-${activite.statut.couleur}`,
              nom: activite.statut.nom,
              mini: true
            },
            value: activite.statut.nom
          }
        }

        return {
          id: activite.id,
          link: { name: 'activite', params: { id: activite.id } },
          columns
        }
      })
    }
  },

  methods: {
    preferencesUpdate(params) {
      if (params.range) {
        params.intervalle = params.range
        delete params.range
      }

      if (params.column) {
        params.colonne = params.column
        delete params.column
      }

      if (params.order) {
        params.ordre = params.order
        delete params.order
      }

      Object.keys(params).forEach(id => {
        this.preferences[id] = params[id]
      })
    }
  }
}
</script>
