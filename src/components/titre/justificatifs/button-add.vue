<template>
  <button @click="addPopupOpen">
    <i class="icon-24 icon-file-plus" />
  </button>
</template>

<script>
import JustificatifsEditPopup from './edit-popup.vue'

export default {
  props: {
    id: { type: String, required: true },
    context: { type: Object, required: true },
    documentsIds: { type: Array, required: true }
  },

  methods: {
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: JustificatifsEditPopup,
        props: {
          id: this.id,
          context: this.context,
          documentsIds: this.documentsIds
        }
      })
    }
  }
}
</script>
