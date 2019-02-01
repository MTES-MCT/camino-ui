<template>
  <li
    v-if="isVisible"
    class="mr-s"
  >
    <button
      class="btn-alt rnd-xs py-s px-m"
      @click="rapportPopupOpen"
    >
      Remplir un rapport…
    </button>
  </li>
</template>

<script>
import leftPad from 'left-pad'
import RapportPopup from './rapport-popup.vue'

export default {
  computed: {
    periode() {
      return this.$store.state.titreTravaux.periode
    },
    titre() {
      return this.$store.state.titre.current
    },
    user() {
      return this.$store.state.user.current
    },
    hasRapport() {
      return (
        this.titre.domaine.id === 'm' &&
        (this.titre.type.id === 'cxx' ||
          this.titre.type.id === 'pxm' ||
          this.titre.type.id === 'axm')
      )
    },
    hasPermissions() {
      const isAmodiataire = this.titre.amodiataires.some(
        t => t.id === this.user.entreprise.id
      )

      const isTitulaire = this.titre.titulaires.some(
        t => t.id === this.user.entreprise.id
      )

      return (
        this.permissionsCheck(['super', 'admin']) ||
        (this.permissionsCheck(['entreprise']) &&
          this.user.entreprise &&
          (isAmodiataire || (!this.titre.amodiataires.length && isTitulaire)))
      )
    },
    isVisible() {
      return this.hasPermissions && this.hasRapport && !this.rapportConfirmed
    },
    rapportExists() {
      return (
        this.titre.travauxRapports &&
        this.titre.travauxRapports.find(
          tr =>
            tr.contenu.trimestre === this.periode.trimestre &&
            tr.contenu.annee === this.periode.annee
        )
      )
    },
    rapportConfirmed() {
      return this.rapportExists && this.rapportExists.confirmation
    },
    rapportCalendrier() {
      return this.$store.state.titreTravaux.rapportCalendrier
    }
  },

  methods: {
    rapportPopupOpen() {
      const rapport = this.rapportExists
        ? JSON.parse(JSON.stringify(this.rapportExists))
        : {
            id: `${this.$store.state.titre.current.id}-${
              this.periode.annee
            }-${leftPad(this.periode.trimestre, 2, '0')}`,
            titreId: this.$store.state.titre.current.id,
            contenu: {
              trimestre: this.periode.trimestre,
              annee: this.periode.annee,
              travaux: JSON.parse(
                JSON.stringify(
                  this.rapportCalendrier[this.periode.trimestre - 1].mois
                )
              )
            }
          }
      this.$store.commit('popupOpen', {
        component: RapportPopup,
        props: {
          rapport,
          titreNom: this.$store.state.titre.current.nom,
          trimestreNom: this.rapportCalendrier[this.periode.trimestre - 1].nom
        }
      })
    }
  }
}
</script>
