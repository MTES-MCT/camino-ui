<template>
  <div>
    <Table
      :rows="lignes"
      :columns="colonnes"
      :pages="pages"
      :range="preferences.intervalle"
      :page="preferences.page"
      :order="preferences.ordre"
      :column="preferences.colonne"
      :ranges="[10, 50, 200, 500]"
      @params:update="preferencesUpdate"
    />
  </div>
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
    demarches: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.titresDemarches.preferences.table
    },

    pages() {
      return Math.ceil(
        this.$store.state.titresDemarches.total / this.preferences.intervalle
      )
    },

    colonnes() {
      return colonnes
    },

    lignes() {
      return lignesBuild(this.demarches)
    }
  },

  watch: {
    pages: function(to, from) {
      if (from && from !== to) {
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

      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'table',
        params
      })

      this.demarchesUpdate()
    },

    demarchesUpdate() {
      this.$emit('demarches:update')
    }
  }
}
</script>
