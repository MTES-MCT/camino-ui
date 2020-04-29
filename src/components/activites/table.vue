<template>
  <Table
    :total="total"
    :rows="lignes"
    :columns="colonnes"
    :pages="pages"
    :range="preferences.intervalle"
    :page="preferences.page"
    :order="preferences.ordre"
    :column="preferences.colonne"
    @params:update="preferencesUpdate"
  />
</template>

<script>
// import Table from '../_ui/table-pagination.vue'
import Table from '../_ui/table.vue'
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

  computed: {
    preferences() {
      return this.$store.state.titresActivites.preferences.table
    },

    pages() {
      return Math.ceil(
        this.$store.state.titresActivites.total / this.preferences.intervalle
      )
    },

    colonnes() {
      return colonnes
    },
    lignes() {
      return lignesBuild(this.activites)
    },

    total() {
      return this.$store.state.titresActivites.total
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

      this.$store.dispatch('titresActivites/preferencesSet', {
        section: 'table',
        params
      })

      this.activitesUpdate()
    },

    activitesUpdate() {
      this.$emit('activites:update')
    }
  }
}
</script>
