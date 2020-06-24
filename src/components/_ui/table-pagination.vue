<template>
  <div>
    <Table
      :column="column"
      :columns="columns"
      :order="order"
      :rows="rows"
      class="width-max"
      @params:update="update"
    />

    <div class="desktop-blobs">
      <div class="desktop-blob-3-4">
        <Pagination
          :active="page"
          :total="pages"
          :visibles="5"
          @page:update="pageUpdate"
        />
      </div>
      <div class="desktop-blob-1-4">
        <Ranges
          v-if="total > 10"
          :ranges="[10, 50, 200, 500]"
          :range="range"
          @range:update="rangeUpdate"
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
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    range: { type: Number, default: 200 },
    page: { type: Number, default: 1 },
    column: { type: String, default: '' },
    order: { type: String, default: 'asc' },
    total: { type: Number, required: true }
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.range)
    }
  },

  methods: {
    update(params) {
      this.$emit('params:update', params)
    },

    pageUpdate(page) {
      this.update({ page })
    },

    rangeUpdate(range) {
      this.update({ range, page: 1 })
    }
  }
}
</script>
