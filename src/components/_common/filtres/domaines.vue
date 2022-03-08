<template>
  <span>
    <Pill :color="`bg-domaine-${element.id}`" class="mr-xs mono">
      {{ element.id }} </Pill
    ><span class="cap-first h6 bold">{{ element.nom }}</span>
  </span>
</template>

<script>
import Pill from '../../_ui/pill.tsx'

export default {
  components: {
    Pill
  },

  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
