<template>
  <div class="sticky-bottom">
    <ul class="list-inline mb-0">
      <li class="mr-s">
        <button 
          class="btn-alt rnd-xs py-s px-m" 
          @click="emailSend"
        >Signaler une erreur</button>
      </li>
      <li 
        v-if="permissions(['super', 'admin'])"
        class="mr-s"
      >
        <button 
          class="btn-alt rnd-xs p-s" 
          @click="declarationPopupOpen"
        >Déclarer</button>
      </li>
      <li class="mr-s">
        <button class="btn-alt rnd-xs p-s hide">Télécharger ({{ total }})</button>
      </li>
      <li class="mr-s">
        <button class="btn-alt rnd-xs p-s hide">Imprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import DeclarationPopup from './declaration-popup.vue'

export default {
  computed: {
    documentsSelected () {
      return this.$store.state.titre.documents.length
    },
    documentsTotal () {
      return this.$store.getters['titre/documentsTotal']
    },
    total () {
      return this.documentsSelected > 0 ? `${this.documentsSelected} / ${this.documentsTotal}` : this.documentsTotal
    }
  },

  methods: {
    emailSend () {
      window.location.href = `mailto:camino@beta.gouv.fr?subject=Erreur ${this.$route.params.id}&body=Bonjour, j'ai repéré une erreur sur le titre ${this.$route.params.id} : `
    },


    declarationPopupOpen () {
      this.$store.commit('popupOpen', { 
        component: DeclarationPopup, 
        props: { 
          declaration: {},
          titreNom: this.$store.state.titre.current.nom,
          declarationPeriode: '1er trimestre 2018',
        } 
      })
    },
    editPopupClose () {
      this.$store.commit('popupClose')
    }
  }
}
</script>
