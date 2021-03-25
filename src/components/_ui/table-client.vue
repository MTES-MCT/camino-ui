<template>
  <Table
    :column="column"
    :columns="columns"
    :order="order"
    :rows="rowsPage"
    @params-update="paramsUpdate"
  />
</template>

<script>
import Table from './table.vue'

export default {
  name: 'UiTable',

  components: { Table },

  props: {
    column: { type: String, default: '' },
    columns: { type: Array, required: true },
    order: { type: String, default: 'asc' },
    rows: { type: Array, required: true },
    range: { type: Number, default: 200 },
    page: { type: Number, default: 1 }
  },

  emits: ['params-update'],

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
    }
  },

  methods: {
    paramsUpdate(params) {
      this.$emit('params-update', params)
    }
  }
}
</script>
