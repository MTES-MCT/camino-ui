<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>Description</th>
        <th>Date</th>
        <th class="full-x-">
          Description
        </th>
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
        :bouton-suppression="boutonSuppression"
        :bouton-modification="boutonModification"
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
    boutonDissociation: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonSuppression: { type: Boolean, default: false },
    context: { type: Object, required: true },
    etiquette: { type: Boolean, default: true },
    documents: { type: Array, default: () => [] },
    parentId: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    repertoire: { type: String, required: true },
    title: { type: String, required: true }
  }
}
</script>
