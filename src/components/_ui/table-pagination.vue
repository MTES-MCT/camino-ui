<template>
  <Table
    :total="rows.length"
    :rows="rowsPage"
    :columns="columns"
    :pages="pages"
    :range="range"
    :page="page"
    :order="order"
    :column="column"
    :ranges="ranges"
    @params:update="paramsUpdate"
  />
</template>

<script>
import Table from './table.vue'

export default {
  name: 'UiTable',

  components: { Table },

  props: {
    rows: { type: Array, required: true },
    columns: { type: Array, required: true },
    range: { type: Number, default: 200 },
    page: { type: Number, default: 1 },
    order: { type: String, default: 'asc' },
    column: { type: String, default: '' },
    ranges: {
      type: Array,
      default: () => [10, 50, 200, 500]
    }
  },

  computed: {
    rowsPages() {
      return this.rows
        .slice()
        .sort((a, b) => {
          const aValue = a.columns[this.column].value.toString()
          const bValue = b.columns[this.column].value.toString()

          return (
            aValue.localeCompare(bValue, 'fr') * (this.order === 'asc' ? 1 : -1)
          )
        })
        .reduce((page, row, i) => {
          const pageId = Math.ceil((i + 1) / this.range) - 1

          page[pageId] = page[pageId] || []
          page[pageId].push(row)

          return page
        }, [])
    },

    rowsPage() {
      return this.rowsPages[this.page - 1] || []
    },

    pages() {
      return this.rowsPages.length || 0
    }
  },

  methods: {
    paramsUpdate(params) {
      this.$emit('params:update', params)
    }
  }
}
</script>
