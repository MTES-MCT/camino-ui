<template>
  <div class="sticky-bottom">
    <ul class="list-inline mb-0">
      <li class="mr-s">
        <button 
          class="btn-alt rnd-xs py-s px-m" 
          @click="emailSend"
        >Signaler une erreur…</button>
      </li>
      <li 
        v-if="permissions(['super', 'admin', 'user'])"
        class="mr-s"
      >
        <button 
          class="btn-alt rnd-xs py-s px-m" 
          @click="declarationPopupOpen"
        >Remplir un rapport…</button>
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
import RapportPopup from './rapport-popup.vue'

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
    },
    calendrier () {
      return this.$store.state.titreTravaux.calendrier
    }
  },

  methods: {
    emailSend () {
      window.location.href = `mailto:camino@beta.gouv.fr?subject=Erreur ${this.$route.params.id}&body=Bonjour, j'ai repéré une erreur sur le titre ${this.$route.params.id} : `
    },

    declarationPopupOpen () {
      this.$store.commit('popupOpen', { 
        component: RapportPopup, 
        props: {
          rapport: { 
            id: `${this.$store.state.titre.current.id}-${this.calendrier[0].numero}`,
            titreId: this.$store.state.titre.current.id,
            contenu: {
              trimestre: this.calendrier[0].numero, 
              travaux: JSON.parse(JSON.stringify(this.calendrier[0].mois))
            }
          },
          titreNom: this.$store.state.titre.current.nom,
          trimestre: this.calendrier[0],
        } 
      })
    },
    editPopupClose () {
      this.$store.commit('popupClose')
    }
  }
}
</script>
