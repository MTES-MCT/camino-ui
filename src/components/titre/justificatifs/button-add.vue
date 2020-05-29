<template>
  <button @click="addPopupOpen">
    <i class="icon-24 icon-file-plus flex-right" />
  </button>
</template>

<script>
import JustificatifsEditPopup from './edit.vue'

export default {
  props: {
    id: { type: String, required: true },
    context: { type: Object, required: true },
    documentsIds: { type: Array, required: true },
    entreprisesIds: { type: Array, required: true }
  },

  methods: {
    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: JustificatifsEditPopup,
        props: {
          id: this.id,
          context: this.context,
          documentsIds: this.documentsIds,
          entreprisesIds: this.entreprisesIds
        }
      })
    }
  }
}
</script>
