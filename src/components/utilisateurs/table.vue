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
import Pagination from '../_ui/pagination.vue'
import Ranges from '../_ui/ranges.vue'
import Table from '../_ui/table-pagination.vue'
import { lignesBuild } from './table'

export default {
  name: 'Utilisateurs',

  components: {
    Table,
    Pagination,
    Ranges
  },

  props: {
    utilisateurs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      colonnes: [
        {
          id: 'nom',
          name: 'Nom',
          class: ['min-width-6']
        },
        {
          id: 'prenom',
          name: 'Prénom',
          class: ['min-width-6']
        },
        {
          id: 'email',
          name: 'Email'
        },
        {
          id: 'permissions',
          name: 'Permissions',
          class: ['min-width-6']
        },
        {
          id: 'lien',
          name: 'Lien',
          class: ['min-width-6']
        }
      ],
      preferences: {
        intervalle: 200,
        page: 1,
        ordre: 'asc',
        colonne: 'nom'
      }
    }
  },

  computed: {
    lignes() {
      return lignesBuild(this.utilisateurs)
    },

    pages() {
      const pages = Math.ceil(this.lignes.length / this.preferences.intervalle)
      return pages || 0
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
