<template>
  <button @click="addPopupOpen">
    <i class="icon-24 icon-file-plus" />
  </button>
</template>

<script>
import DocumentEditPopup from './edit-popup.vue'

export default {
  props: {
    etapeId: { type: String, default: '' },
    context: { type: Object, required: true }
  },

  methods: {
    addPopupOpen() {
      const document = {
        titreEtapeId: this.etapeId,
        typeId: '',
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null
      }

      this.$store.commit('popupOpen', {
        component: DocumentEditPopup,
        props: {
          document,
          context: this.context,
          creation: true
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
