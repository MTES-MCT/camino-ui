<template>
  <Table
    :rows="lignes"
    :columns="colonnes"
    :range="preferences.intervalle"
    :page="preferences.page"
    :order="preferences.ordre"
    :column="preferences.colonne"
    @params:update="preferencesUpdate"
  />
</template>

<script>
import Table from '../_ui/table-pagination.vue'
import { colonnes, lignesBuild } from './table.js'

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
      colonnes,
      preferences: {
        intervalle: 200,
        page: 1,
        ordre: 'asc',
        colonne: 'titre'
      }
    }
  },

  computed: {
    lignes() {
      return lignesBuild(this.activites)
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
