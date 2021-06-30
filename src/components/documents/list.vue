<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>Nom</th>
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
        :route="route"
        :add-action="addAction"
        :remove-action="removeAction"
        :repertoire="repertoire"
        :title="title"
        :etiquette="etiquette"
        :bouton-suppression="boutonSuppression && document.suppression"
        :bouton-modification="boutonModification && document.modification"
        :bouton-dissociation="boutonDissociation"
        :manquant-show="manquantShow"
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
    documents: { type: Array, required: true },
    repertoire: { type: String, required: true },
    title: { type: String, default: '' },
    route: { type: Object, default: null },
    addAction: { type: Object, default: null },
    removeAction: { type: Object, default: null },
    parentId: { type: String, default: '' },
    parentTypeId: { type: String, default: '' },
    etiquette: { type: Boolean, default: false },
    boutonDissociation: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonSuppression: { type: Boolean, default: false },
    manquantShow: { type: Boolean, default: false }
  }
}
</script>
