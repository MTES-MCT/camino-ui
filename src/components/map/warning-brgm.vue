<template>
  <div
    v-if="brgmWarning"
    class="bg-warning p-s color-bg mb"
  >
    Fond de carte visible aux niveaux de zoom 12 à 16 en métropole (hors Gironde, Lot et Garonne, Dordogne, Charente Maritime et Vienne).
  </div>
</template>

<script>
export default {
  props: {
    tilesId: {
      type: String,
      default: ''
    },
    zoom: {
      type: Number,
      default: 0
    }
  },

  computed: {
    brgmWarning() {
      return this.tilesId === 'brgm-geo' && (this.zoom < 12 || this.zoom > 16)
    }
  }
}
</script>
