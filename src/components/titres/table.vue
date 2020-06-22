<template>
  <div>
    <Table
      :column="preferences.colonne"
      :columns="colonnes"
      :order="preferences.ordre"
      :page="preferences.page"
      :range="preferences.intervalle"
      :rows="lignes"
      class="width-max"
      @params:update="preferencesUpdate"
    />

    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :active="preferences.page"
          :total="pages"
          :visibles="5"
          @page:update="pageUpdate"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="lignes.length > 10"
          :ranges="[10, 50, 200, 500]"
          :range="preferences.intervalle"
          @range:update="intervalleUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../_ui/table-client.vue'
import Pagination from '../_ui/pagination.vue'
import Ranges from '../_ui/ranges.vue'
import { titresColonnes, titresLignesBuild } from './table.js'

export default {
  name: 'Titres',

  components: {
    Table,
    Pagination,
    Ranges
  },

  props: {
    titres: { type: Array, required: true }
  },

  computed: {
    preferences() {
      return this.$store.state.titres.preferences.table
    },

    activitesCol() {
      const user = this.$store.state.user.current

      return user && user.sections.activites
    },

    colonnes() {
      return titresColonnes.filter(({ id }) =>
        this.activitesCol ? true : id !== 'activites'
      )
    },

    lignes() {
      return titresLignesBuild(this.titres, this.activitesCol)
    },

    pages() {
      const pages = Math.ceil(this.lignes.length / this.preferences.intervalle)
      return pages || 0
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

      this.$store.dispatch('titres/preferencesSet', {
        section: 'table',
        params
      })
    },

    pageUpdate(page) {
      this.preferencesUpdate({ page })
    },

    intervalleUpdate(range) {
      this.preferencesUpdate({ range, page: 1 })
    }
  }
}
</script>
