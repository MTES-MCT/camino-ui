<template>
  <span><Dot :color="color" /><span class="cap-first">{{ element.nom }}</span></span>
</template>

<script>
import Dot from '../ui/dot.vue'

export default {
  components: {
    Dot
  },
  props: {
    element: { type: Object, default: () => ({}) }
  },
  computed: {
    color() {
      return `bg-${this.element.couleur}`
    }
  }
}
</script>
