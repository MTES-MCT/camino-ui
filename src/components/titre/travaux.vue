<template>
  <div>
    <div v-if="titre.travauxCreation">
      <button
        class="btn small rnd-xs py-s px-m full-x flex mb"
        @click="travauxAddPopupOpen"
      >
        <span class="mt-xxs">Ajouter des travaux</span>
        <i class="icon-24 icon-plus flex-right" />
      </button>
      <div class="line width-full mb-xxl" />
    </div>

    <TitreTravau
      v-for="travau in travaux"
      :key="travau.id"
      :travaux="travau"
      :type="titre.type"
      @titre-event-track="eventTrack"
    />
  </div>
</template>

<script>
import TitreTravau from './travau.vue'
import EditPopup from './travaux-edit-popup.vue'

export default {
  components: {
    TitreTravau
  },

  props: {
    travaux: { type: Array, default: () => [] }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    }
  },

  methods: {
    travauxAddPopupOpen() {
      const travaux = {
        typeId: null,
        titreId: this.titre.id
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          travaux,
          titreTypeNom: this.titre.type.type.nom,
          titreNom: this.titre.nom,
          creation: true
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-travaux_ajouter',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      this.$emit('titre-event-track', event)
    }
  }
}
</script>
