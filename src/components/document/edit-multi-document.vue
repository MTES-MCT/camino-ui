<template>
  <div v-if="visible">
    <h4 :class="{ 'mb-s': documentType.optionnel }">{{ documentType.nom }}</h4>
    <p v-if="documentType.optionnel" class="h5 italic mb">Optionnel</p>

    <hr />

    <EditSections
      v-model:document="document"
      :modifiable="modifiable"
      :repertoire="repertoire"
    />
  </div>
</template>

<script>
import EditSections from './edit-sections.vue'

export default {
  name: 'CaminoDocumentEditMulti',

  components: {
    EditSections
  },

  props: {
    document: { type: Object, required: true },
    documentType: { type: Object, required: true },
    modifiable: { type: Boolean, default: true },
    repertoire: { type: String, required: true }
  },

  computed: {
    visible() {
      return (
        this.modifiable ||
        !this.documentType.optionnel ||
        this.document.fichier ||
        this.document.fichierNouveau
      )
    }
  }
}
</script>
