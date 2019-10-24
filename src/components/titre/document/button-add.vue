<template>
  <div>
    <button
      v-if="permissionsCheck(['super'])"
      class="btn-border rnd-xs py-s px-m full-x flex mb"
      @click="addPopupOpen"
    >
      Ajouter un document <i class="icon-24 icon-plus flex-right" />
    </button>
  </div>
</template>

<script>
import DocumentEditPopup from './edit.vue'

export default {
  props: {
    etapeId: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    demarcheTypeNom: { type: String, default: '' },
    etapeTypeNom: { type: String, default: '' }
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
          demarcheTypeNom: this.demarcheTypeNom,
          titreNom: this.titreNom,
          etapeTypeNom: this.etapeTypeNom,
          creation: true
        }
      })
    }
  }
}
</script>
