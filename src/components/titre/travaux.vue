<template>
  <div>
    <div>
      <div class="line-neutral mb" />
      <button
        class="btn rnd-xs py-s px-m full-x flex h5 mb"
        @click="travauxAddPopupOpen"
      >
        <span class="mt-xxs">Ajouter des travaux</span> <i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <TitreDemarche
      v-for="demarche in demarches"
      :key="demarche.id"
      :demarche="demarche"
      :type="titre.type"
      @titre:eventTrack="eventTrack"
    />
  </div>
</template>

<script>
import TitreDemarche from './demarche.vue'
import EditPopup from './travaux-edit-popup.vue'

export default {
  components: {
    TitreDemarche
  },

  props: {
    demarches: {
      type: Array,
      default: () => []
    }
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
          types: this.titre.type.demarchesTypes,
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
      this.$emit('titre:eventTrack', event)
    }
  }
}
</script>
