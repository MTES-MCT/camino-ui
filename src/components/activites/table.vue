<template>
  <div>
    <Table
      :column="preferences.colonne"
      :columns="colonnes"
      :order="preferences.ordre"
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
          v-if="total > 10"
          :ranges="[10, 50, 200, 500]"
          :range="preferences.intervalle"
          @range:update="intervalleUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../_ui/table.vue'
import Pagination from '../_ui/pagination.vue'
import Ranges from '../_ui/ranges.vue'
import { colonnes, lignesBuild } from './table.js'

export default {
  name: 'ActivitesTable',

  components: {
    Table,
    Pagination,
    Ranges
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
    pageUpdate(page) {
      this.preferencesUpdate({ page })
    },

    intervalleUpdate(range) {
      this.preferencesUpdate({ range, page: 1 })
    },

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
