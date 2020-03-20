<template>
  <span>
    <Square
      :color="
        `bg-titre-nature-${
          element.exploitation ? 'exploitation' : 'exploration'
        }`
      "
      class="mr-xs mono"
    >
    </Square
    ><span class="cap-first">{{ element.nom }}</span>
  </span>
</template>

<script>
import Square from '../../_ui/square.vue'

export default {
  components: {
    Square
  },

  props: {
    element: { type: Object, default: () => ({}) }
  }
}
</script>
