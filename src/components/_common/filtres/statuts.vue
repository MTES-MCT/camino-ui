<template>
  <Statut
    :color="element.couleur"
    :nom="element.nom"
    class="inline-block"
  />
</template>

<script>
import Statut from '../statut.vue'

export default {
  components: {
    Statut
  },

  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
