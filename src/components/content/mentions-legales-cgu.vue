<template>
  <div>
    <MentionsLegales />
    <Cgu />
  </div>
</template>

<script>
import MentionsLegales from './mentions-legales.vue'
import Cgu from './cgu'

export default {
  name: 'MentionsLegalesCgu',

  components: {
    MentionsLegales,
    Cgu
  }
}
</script>
