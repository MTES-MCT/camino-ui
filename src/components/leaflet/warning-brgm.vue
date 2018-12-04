<template>
  <div 
    v-if="brgmWarning"
    class="bg-warning p-s color-bg mb"
  >
    Le fond de carte selectionné n'est visible que si le zoom est compris entre 12 et 16.
  </div>
</template>

<script>
export default {
  props: {
    tilesName: {
      type: String,
      default: ''
    },
    zoomLevel: {
      type: Number,
      default: 0
    }
  },

  computed: {
    brgmWarning () {
      return this.tilesName === "BRGM / Cartes géologiques 1/50 000" && (this.zoomLevel < 12 || this.zoomLevel > 16)
    }
  }
}
</script>
