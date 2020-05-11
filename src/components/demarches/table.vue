<template>
  <div>
    <Table
      :column="preferences.colonne"
      :columns="colonnes"
      :order="preferences.ordre"
      :rows="lignes"
      class="width-max"
      @params:update="preferencesUpdate"
      @table:eventTrack="eventTrack"
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
import { colonnes, lignesBuild } from './table'

export default {
  name: 'Titres',

  components: {
    Table,
    Pagination,
    Ranges
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
    },

    total() {
      return this.$store.state.titresDemarches.total
    }
  },

  watch: {
    // TODO: à supprimer
    // la page en cours doit être indiqué dans la réponse du serveur
    // et mise à jour dans les préférences
    pages: function(to, from) {
      if (from && from !== to && this.preferences.page !== 1) {
        this.preferencesUpdate({ page: 1 })
      }
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

      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'table',
        params
      })

      this.demarchesUpdate()
    },

    demarchesUpdate() {
      this.$emit('demarches:update')
    },

    eventTrack(id) {
      if (this.$matomo) {
        this.$matomo.trackEvent(
          'page-titre',
          'accès-page-titre-depuis',
          'liste des demarches'
        )
      }
    }
  }
}
</script>
