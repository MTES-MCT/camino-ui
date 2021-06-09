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

    <SectionsEdit
      v-model:document="document"
      :modifiable="modifiable"
      :repertoire="repertoire"
      :user-is-admin="userIsAdmin"
    />
  </div>
</template>

<script>
import SectionsEdit from './sections-edit.vue'

export default {
  name: 'CaminoDocumentEditMulti',

  components: { SectionsEdit },

  props: {
    document: { type: Object, required: true },
    documentType: { type: Object, required: true },
    modifiable: { type: Boolean, default: true },
    supprimable: { type: Boolean, default: false },
    repertoire: { type: String, required: true }
  },

  emits: ['remove'],

  computed: {
    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
    },

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
