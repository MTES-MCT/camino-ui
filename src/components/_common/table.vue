<template>
  <div>
    <Table
      :column="preferences.colonne"
      :columns="colonnes"
      :order="preferences.ordre"
      :rows="lignes"
      class="width-max"
      @params:update="update"
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

export default {
  name: 'CaminoTable',

  components: {
    Table,
    Pagination,
    Ranges
  },

  props: {
    colonnes: { type: Array, required: true },
    lignes: { type: Array, required: true },
    preferences: { type: Object, required: true },
    total: { type: Number, required: true }
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.preferences.intervalle)
    }
  },

  methods: {
    update(params) {
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

      this.$emit('preferences:update', params)
      this.$emit('elements:update')
    },

    pageUpdate(page) {
      this.update({ page })
    },

    intervalleUpdate(range) {
      this.update({ range, page: 1 })
    }
  }
}
</script>
