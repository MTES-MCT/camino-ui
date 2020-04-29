<template>
  <span class="border bg-bg rnd py-xs pl-xs pr-m">
    <Dot :color="`bg-${color}`" />
    <span
      class="cap-first mb-0 bold color-neutral"
      :class="{ h5: mini}"
    >{{ nom }}</span>
  </span>
</template>

<script>
import Dot from '../_ui/dot.vue'

export default {
  components: { Dot },
  props: {
    mini: { type: Boolean, default: false },
    color: { type: String, default: 'bg-neutral' },
    nom: { type: String, default: 'indéfini' }
  }
}
</script>
