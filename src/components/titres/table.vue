<template>
  <Table
    :rows="lignes"
    :columns="colonnes"
    :params="params"
    :ranges="[10, 50, 200, 500]"
    @params:update="preferencesUpdate"
  />
</template>

<script>
import Table from '../_ui/table.vue'
import { colonnes, lignesBuild } from './table.js'

export default {
  name: 'Titres',

  components: {
    Table
  },

  props: {
    titres: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.user.preferences.titres.table
    },

    activitesCol() {
      const user = this.$store.state.user.current

      return user && user.sections.activites
    },

    colonnes() {
      return colonnes.filter(({ id }) =>
        this.activitesCol ? true : id !== 'activites'
      )
    },

    lignes() {
      return lignesBuild(this.titres, this.activitesCol)
    },

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
    }
  },

  watch: {
    titres: function(to, from) {
      if (from.length && from.length !== to.length) {
        const params = { page: 1 }

        this.preferencesUpdate(params)
      }
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

      this.$store.dispatch('user/preferencesSet', {
        section: 'titres.table',
        params
      })
    }
  }
}
</script>
