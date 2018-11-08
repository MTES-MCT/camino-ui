<template>
  <li 
    v-if="isVisible"
    class="mr-s"
  >
    <button 
      class="btn-alt rnd-xs py-s px-m" 
      @click="rapportPopupOpen"
    >Remplir un rapport…</button>
  </li>
</template>

<script>
import RapportPopup from './rapport-popup.vue'

export default {
  computed: {
    titre () {
      return this.$store.state.titre.current
    }, 
    user () {
      return this.$store.state.user.current
    },
    hasRapport () {
      return this.titre.domaine.id === 'm' && (this.titre.type.id === 'cxx' || this.titre.type.id === 'pxm' || this.titre.type.id === 'axm')
    },
    hasPermissions () {
      return (this.permissionsCheck(['super', 'admin', 'editeur']) || this.permissionsCheck(['societe']) && this.user.entreprise.id === this.titre.titluaire.id)
    },
    isVisible () {
      return this.hasPermissions && this.hasRapport
    },
    rapportCalendrier () {
      return this.$store.state.titreTravaux.rapportCalendrier
    }
  },

  methods: {
    rapportPopupOpen () {
      this.$store.commit('popupOpen', { 
        component: RapportPopup, 
        props: {
          rapport: { 
            id: `${this.$store.state.titre.current.id}-${this.rapportCalendrier[0].numero}`,
            titreId: this.$store.state.titre.current.id,
            contenu: {
              trimestre: this.rapportCalendrier[0].numero, 
              travaux: JSON.parse(JSON.stringify(this.rapportCalendrier[0].mois))
            }
          },
          titreNom: this.$store.state.titre.current.nom,
          trimestre: this.rapportCalendrier[0],
        } 
      })
    }
  }
}
</script>
