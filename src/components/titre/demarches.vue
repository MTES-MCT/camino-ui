<template>
  <div>
    <div v-if="titre.modification">
      <div class="line-neutral mb" />
      <button
        class="btn rnd-xs py-s px-m full-x flex h5 mb"
        @click="demarcheAddPopupOpen"
      >
        <span class="mt-xxs">Ajouter une démarche</span> <i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <TitreDemarche
      v-for="demarche in demarches"
      :key="demarche.id"
      :demarche="demarche"
      :type="titre.type"
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
    demarcheAddPopupOpen() {
      const demarche = {
        typeId: null,
        titreId: this.titre.id
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          types: this.titre.type.demarchesTypes,
          titreTypeNom: this.titre.type.type.nom,
          titreNom: this.titre.nom,
          creation: true
        }
      })
    }
  }
}
</script>
