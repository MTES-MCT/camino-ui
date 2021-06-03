<template>
  <button @click="addPopupOpen">
    <i class="icon-24 icon-file-plus" />
  </button>
</template>

<script>
import DocumentEditPopup from './edit-popup.vue'

export default {
  props: {
    route: { type: Object, default: null },
    mutation: { type: Object, default: null },
    document: { type: Object, required: true },
    parentId: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    repertoire: { type: String, required: true },
    title: { type: String, required: true }
  },

  emits: ['titre-event-track'],

  methods: {
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: DocumentEditPopup,
        props: {
          route: this.route,
          mutation: this.mutation,
          creation: true,
          document: this.document,
          parentTypeId: this.parentTypeId,
          repertoire: this.repertoire,
          title: this.title
        }
      })

      this.$emit('titre-event-track', {
        categorie: 'titre-sections',
        action: 'titre-etape-doc_ajouter',
        nom: this.$route.params.id
      })
    }
  }
}
</script>
