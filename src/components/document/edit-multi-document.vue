<template>
  <div v-if="visible">
    <div class="flex">
      <h4 :class="{ 'mb-s': documentType.optionnel }">
        {{ documentType.nom }}
      </h4>

      <div v-if="supprimable" class="flex-right">
        <button class="btn py-s px-m rnd-xs" @click="documentRemove">
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>
    <p v-if="documentType.optionnel" class="h6 italic mb">Optionnel</p>

    <hr />

    <EditSections
      v-model:document="document"
      :modifiable="modifiable"
      :repertoire="repertoire"
      :optionnel="documentType.optionnel"
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
    supprimable: { type: Boolean, default: false },
    repertoire: { type: String, required: true }
  },

  emits: ['remove'],

  computed: {
    visible() {
      return (
        this.modifiable ||
        !this.documentType.optionnel ||
        this.document.fichier ||
        this.document.fichierNouveau
      )
    }
  },

  methods: {
    documentRemove() {
      this.$emit('remove')
    }
  }
}
</script>
