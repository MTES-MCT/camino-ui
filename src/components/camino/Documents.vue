<template>
  <div>
    <div class="flex">
      <h4 class="mt-s">Documents</h4>
      <div class="flex-right">
        <btn-toggle
          :opened="opened"
          @click.native="opened = !opened" />
      </div>
    </div>
    <hr class="mb-0">
    <documents-table
      :documents="documents"
      :opened="opened" />
  </div>
</template>

<script>
import BtnToggle from '@/components/ui/BtnToggle.vue'
import DocumentsTable from '@/components/camino/DocumentsTable.vue'

export default {
  components: {
    BtnToggle,
    DocumentsTable
  },

  props: {
    documents: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      opened: false
    }
  }
}
</script>
