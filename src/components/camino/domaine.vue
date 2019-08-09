<template>
  <Pill
    :color="`bg-titre-domaine-${domaineId}`"
    class="mono"
  >
    {{ domaineId }}
  </Pill>
</template>

<script>
import Pill from '../ui/pill.vue'

export default {
  components: {
    Pill
  },
  props: {
    domaineId: { type: String, default: 'm' }
  }
}
</script>

