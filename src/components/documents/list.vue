<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>{{ nom }}</th>
        <th class="full-x-">
          Description
        </th>
        <th />
      </tr>
      <DocumentTr
        v-for="document in documents"
        :key="document.id"
        :document="document"
        :etape-id="etapeId"
        :context="context"
      />
    </table>
  </div>
</template>

<script>
import DocumentTr from '../document/tr.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: { type: Array, default: () => [] },
    etapeId: { type: String, default: '' },
    nom: { type: String, default: 'Document' },
    context: { type: Object, required: true }
  }
}
</script>
