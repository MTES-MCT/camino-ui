<template>
  <span>
    <Dot :color="`bg-${element.couleur}`" />
    <span class="cap-first h5 bold">{{ element.nom }}</span>
  </span>
</template>

<script>
import Dot from '../../_ui/dot.vue'

export default {
  components: {
    Dot
  },

  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
