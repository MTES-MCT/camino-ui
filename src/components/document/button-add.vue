<template>
  <button class="flex small" @click="addPopupOpen">
    <span v-if="large" class="mt-xxs mr-s">Ajouter un document</span>
    <i class="icon-24 icon-file-plus flex-right" />
  </button>
</template>

<script>
import DocumentEditPopup from './edit-popup.vue'

export default {
  props: {
    route: { type: Object, default: null },
    action: { type: Object, default: null },
    document: { type: Object, required: true },
    parentTypeId: { type: String, default: '' },
    repertoire: { type: String, required: true },
    title: { type: String, required: true },
    large: { type: Boolean, default: false }
  },

  emits: ['titre-event-track'],

  methods: {
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: DocumentEditPopup,
        props: {
          document: this.document,
          action: this.action,
          route: this.route,
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
