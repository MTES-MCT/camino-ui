<template>
  <button
    class="cmn-activite-btn-remplir btn small py-s px-m flex mr-px"
    @click="activiteEditPopupOpen"
  >
    <div v-if="buttonText" class="my-xxs">
      {{ buttonText }}
    </div>
    <i v-else class="icon-24 icon-pencil" />
  </button>
  <button
    v-if="activite.statut.id === 'enc'"
    class="cmn-activite-btn-depose btn small py-s px-m flex mr-px"
    :disabled="!activite.deposable"
    :class="{ disabled: !activite.deposable }"
    @click="activiteDepotPopupOpen"
  >
    <span class="mt-xxs mb-xxs">Déposer…</span>
  </button>
</template>

<script>
import DeposePopup from './depose-popup.vue'

export default {
  props: {
    activite: { type: Object, default: () => ({}) },
    route: { type: Object, required: true }
  },

  computed: {
    buttonText() {
      if (this.activite.deposable || this.activite.statut.id === 'dep') {
        return null
      }
      return this.activite.statut.id === 'abs' ? 'Remplir…' : 'Compléter…'
    }
  },

  methods: {
    activiteDepotPopupOpen() {
      this.$store.commit('popupOpen', {
        component: DeposePopup,
        props: {
          activite: this.activite,
          route: this.route
        }
      })

      this.eventTrack({
        categorie: 'titre-activite',
        action: 'titre-activite_depot',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    activiteEditPopupOpen() {
      this.$router.push({
        name: 'activite-edition',
        params: { id: this.activite.id }
      })
    }
  }
}
</script>
