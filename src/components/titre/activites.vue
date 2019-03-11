<template>
  <div>
    <Activite
      v-for="activite in activites"
      :key="activite.id"
      :activite="activite"
    />
  </div>
</template>

<script>
import Activite from './activite.vue'

export default {
  components: {
    Activite
  },

  props: {
    activites: {
      type: Array,
      default: () => []
    }
  }
}
</script>
