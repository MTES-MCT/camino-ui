<template>
  <div
    v-if="brgmWarning"
    class="bg-warning p-s color-bg mb"
  >
    Le fond de carte selectionné n'est visible que si le zoom est compris entre
    12 et 16.
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
