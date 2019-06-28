<template>
  <span>
    <Pill
      :color="color"
      class="mr-xs mono"
    >
      {{ element.id }}
    </Pill><span class="cap-first">{{ element.nom }}</span>
  </span>
</template>

<script>
import Pill from '../ui/pill.vue'

export default {
  components: {
    Pill
  },
  props: {
    element: { type: Object, default: () => ({}) }
  },
  computed: {
    color() {
      return `bg-titre-domaine-${this.element.id}`
    }
  }
}
</script>
