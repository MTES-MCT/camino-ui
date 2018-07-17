<template>
  <accordion class="mb">
    <template slot="title">Documents</template>
    <documents-table
      :documents="documents" />
  </accordion>
</template>

<script>
import Accordion from '@/components/ui/accordion.vue'
import DocumentsTable from '@/components/camino/documents-table.vue'

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
