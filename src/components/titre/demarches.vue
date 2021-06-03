<template>
  <div>
    <div v-if="titre.demarchesCreation">
      <button
        class="btn small rnd-xs py-s px-m full-x flex mb"
        @click="demarcheAddPopupOpen"
      >
        <span class="mt-xxs">Ajouter une démarche</span>
        <i class="icon-24 icon-plus flex-right" />
      </button>
      <div class="line width-full mb-xxl" />
    </div>

    <TitreDemarche
      v-for="demarche in demarches"
      :key="demarche.id"
      :demarche="demarche"
      :domaine-id="titre.domaine.id"
      :titre-type="titre.type"
      :titre-nom="titre.nom"
      :titre-id="titre.id"
      @event-track="eventTrack"
    />
  </div>
</template>

<script>
import TitreDemarche from './demarche.vue'
import EditPopup from './demarche-edit-popup.vue'

export default {
  components: {
    TitreDemarche
  },

  props: {
    demarches: { type: Array, default: () => [] }
  },

  emits: ['event-track'],

  computed: {
    titre() {
      return this.$store.state.titre.element
    }
  },

  methods: {
    demarcheAddPopupOpen() {
      const demarche = {
        typeId: null,
        titreId: this.titre.id
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          titreTypeNom: this.titre.type.type.nom,
          titreNom: this.titre.nom,
          creation: true
        }
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-demarche_ajouter',
        nom: this.$route.params.id
      })
    },

    eventTrack(event) {
      this.$emit('event-track', event)
    }
  }
}
</script>
