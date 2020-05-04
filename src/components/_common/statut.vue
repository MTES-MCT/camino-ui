<template>
  <div>
    <pill :color="`bg-${color}`">
      {{ nom }}
    </pill>
  </div>
</template>

<script>
import Pill from '../_ui/pill.vue'

export default {
  components: {
    Pill
  },

  props: {
    color: { type: String, default: 'neutral' },
    nom: { type: String, default: 'indéfini' }
  }
}
</script>
