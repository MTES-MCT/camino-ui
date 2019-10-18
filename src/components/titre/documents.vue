<template>
  <div>
    <button
      v-if="permissionsCheck(['super'])"
      class="btn-border rnd-xs py-s px-m full-x flex mb-s mt"
      @click="addPopupOpen"
    >
      Ajouter un document <i class="icon-24 icon-plus flex-right" />
    </button>
    <div class="overflow-scroll-x">
      <table>
        <tr>
          <th>Document</th>
          <th>Nom</th>
          <th />
        </tr>
        <DocumentTr
          v-for="document in documents"
          :key="document.id"
          :document="document"
          :titre-nom="titreNom"
          :demarche-type-nom="demarcheTypeNom"
          :etape-type-nom="etapeTypeNom"
          :etape-id="etapeId"
        />
      </table>
    </div>
  </div>
</template>

<script>
import DocumentTr from './document/tr.vue'
import DocumentEditPopup from './document/edit.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: { type: Array, default: () => [] },
    etapeId: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    demarcheTypeNom: { type: String, default: '' },
    etapeTypeNom: { type: String, default: '' }
  },

  methods: {
    addPopupOpen() {
      const document = {
        titreEtapeId: this.etapeId
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
