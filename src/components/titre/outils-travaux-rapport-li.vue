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
import leftPad from 'left-pad'
import RapportPopup from './rapport-popup.vue'

export default {
  computed: {
    periode () {
      return this.$store.state.titreTravaux.periode
    },
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
      return (this.permissionsCheck(['super', 'admin', 'editeur']) || this.permissionsCheck(['entreprise']) && this.user.entreprise && !!this.titre.titulaires.find(t => t.id === this.user.entreprise.id))
    },
    isVisible () {
      return this.hasPermissions && this.hasRapport && !this.rapportExists
    },
    rapportExists () {
      return this.titre.travauxRapports && this.titre.travauxRapports.find(tr => tr.contenu.trimestre === this.periode.trimestre && tr.contenu.annee === this.periode.annee)
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
            id: `${this.$store.state.titre.current.id}-${this.periode.annee}-${leftPad(this.periode.trimestre, 2, '0')}`,
            titreId: this.$store.state.titre.current.id,
            contenu: {
              trimestre: this.periode.trimestre, 
              annee: this.periode.annee,
              travaux: JSON.parse(JSON.stringify(this.rapportCalendrier[this.periode.trimestre - 1].mois))
            }
          },
          titreNom: this.$store.state.titre.current.nom,
          trimestreNom: this.rapportCalendrier[this.periode.trimestre - 1].nom,
        } 
      })
    }
  }
}
</script>
