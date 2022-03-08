<template>
  <Pill :color="`bg-domaine-${domaineId}`" class="mono">
    {{ domaineId }}
  </Pill>
</template>

<script>
import Pill from '../_ui/pill.tsx'

export default {
  components: {
    Pill
  },
  props: {
    domaineId: { type: String, default: 'm' }
  }
}
</script>
