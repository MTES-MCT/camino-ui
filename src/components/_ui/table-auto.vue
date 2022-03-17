<template>
  <Table
    :columns="props.columns"
    :rows="myRows"
    :column="sort.column"
    :order="sort.order"
    @params-update="handleChange"
  />
</template>

<script setup lang="ts">
import { Column, InitialSort, Row, TableSortEvent } from './table-auto.type'
import Table from './table.vue'
import { reactive, watch } from 'vue'

const props = defineProps<{
  rows: Row[]
  columns: Column[]
  initialSort?: InitialSort
}>()

const sort = reactive<TableSortEvent>({
  column: props?.initialSort?.column ?? props.columns[0].id,
  order: props?.initialSort?.order ?? 'asc'
})
const myRows = reactive<Row[]>([...props.rows])
handleChange(sort)
watch(
  () => props.rows,
  () => {
    myRows.splice(0, myRows.length, ...props.rows)
    handleChange(sort)
  },
  { deep: true }
)
function handleChange(event: TableSortEvent) {
  myRows.sort((row1, row2) => {
    const value1 = row1.columns[event.column].value
    const value2 = row2.columns[event.column].value
    if (value1 < value2) {
      return event.order === 'asc' ? -1 : 1
    }
    if (value1 > value2) {
      return event.order === 'asc' ? 1 : -1
    }
    return 0
  })
  sort.column = event.column
  sort.order = event.order
}
</script>
