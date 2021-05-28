<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>Description</th>
        <th>Date</th>
        <th class="full-x-">Description</th>
        <th />
      </tr>
      <DocumentTr
        v-for="document in documents"
        :key="document.id"
        :document="document"
        :parent-id="parentId"
        :parent-type-id="parentTypeId"
        :context="context"
        :repertoire="repertoire"
        :title="title"
        :etiquette="etiquette"
        :bouton-suppression="boutonSuppression && document.suppression"
        :bouton-modification="boutonModification && document.modification"
        :bouton-dissociation="boutonDissociation"
      />
    </table>
  </div>
</template>

<script>
import DocumentTr from './tr.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: { type: Array, default: () => [] },
    etiquette: { type: Boolean, default: false },
    boutonDissociation: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonSuppression: { type: Boolean, default: false },
    context: { type: Object, default: () => ({}) },
    parentId: { type: String, default: '' },
    parentTypeId: { type: String, default: '' },
    repertoire: { type: String, default: '' },
    title: { type: String, default: '' }
  }
}
</script>
