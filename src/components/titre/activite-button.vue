<template>
  <div
    class="mr-s"
  >
    <button
      class="btn-alt rnd-xs py-s px-m"
      @click="activitePopupOpen"
    >
      Remplir un rapport…
    </button>
  </div>
</template>

<script>
import activitePopup from './activite-popup.vue'

export default {
  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    activitePopupOpen() {
      this.$store.commit('popupOpen', {
        component: activitePopup,
        props: {
          activite: this.activite
        }
      })
    }
  }
}
</script>
