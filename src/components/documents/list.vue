<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>{{ nom }}</th>
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
        :element-id="elementId"
        :context="context"
        :repertoire="repertoire"
        :title="title"
        :bouton-suppression="boutonSuppression"
        :bouton-modification="boutonModification"
        :bouton-delier="boutonDelier"
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
    elementId: { type: String, default: '' },
    nom: { type: String, default: 'Document' },
    title: { type: String, default: '' },
    context: { type: Object, required: true },
    repertoire: { type: String, required: true },
    boutonSuppression: { type: Boolean, default: true },
    boutonModification: { type: Boolean, default: true },
    boutonDelier: { type: Boolean, default: false }
  }
}
</script>
