<template>
  <div>
    <Dot :color="color" />
    <span
      class="cap-first mb-0 bold"
      :class="{ h5: mini}"
    >{{ nom }}</span>
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'

export default {
  components: { Dot },
  props: {
    mini: { type: Boolean, default: false },
    color: { type: String, default: 'bg-neutral' },
    nom: { type: String, default: 'indéfni' }
  }
}
</script>
