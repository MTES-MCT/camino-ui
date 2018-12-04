<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>Documents</th>
        <th />
      </tr>
      <DocumentTr
        v-for="document in documents"
        :key="document.id"
        :document="document"
      />
    </table>
  </div>
</template>

<script>
import DocumentTr from './document-tr.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: {
      type: Array,
      default: () => []
    }
  }
}
</script>
