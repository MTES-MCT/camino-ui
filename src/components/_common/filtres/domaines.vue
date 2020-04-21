<template>
  <span>
    <Pill
      :color="`bg-titre-domaine-${element.id}`"
      class="mr-xs mono"
    >
      {{ element.id }}
    </Pill><span class="cap-first h5 bold">{{ element.nom }}</span>
  </span>
</template>

<script>
import Pill from '../../_ui/pill.vue'

export default {
  components: {
    Pill
  },

  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
