<template>
  <Pill :color="`bg-${color}`">
    {{ nom }}
  </Pill>
</template>

<script>
import Pill from '../_ui/pill.tsx'

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
