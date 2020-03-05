<template>
  <span>
    <Dot :color="`bg-${element.couleur}`" />
    <span class="cap-first">{{ element.nom }}</span>
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
