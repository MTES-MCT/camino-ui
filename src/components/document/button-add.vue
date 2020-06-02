<template>
  <button @click="addPopupOpen">
    <i class="icon-24 icon-file-plus" />
  </button>
</template>

<script>
import DocumentEditPopup from './edit-popup.vue'

export default {
  props: {
    document: { type: Object, required: true },
    title: { type: String, default: '' },
    context: { type: Object, required: true },
    repertoire: { type: String, required: true }
  },

  methods: {
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: DocumentEditPopup,
        props: {
          title: this.title,
          document: this.document,
          context: this.context,
          creation: true,
          repertoire: this.repertoire
        }
      })

      this.$emit('titre:eventTrack', {
        categorie: 'titre-sections',
        action: 'titre-etape-doc_ajouter',
        nom: this.$route.params.id
      })
    }
  }
}
</script>
