<template>
  <accordion class="mb">
    <template slot="title">Documents</template>
    <documents-table
      :documents="documents" />
  </accordion>
</template>

<script>
import Accordion from '../ui/accordion.vue'
import DocumentsTable from '../camino/documents-table.vue'

export default {
  components: {
    Accordion,
    DocumentsTable
  },

  props: {
    documents: {
      type: Array,
      default: () => []
    }
  }
}
</script>
