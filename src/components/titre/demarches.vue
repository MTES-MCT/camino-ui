<template>
  <div>
    <TitreDemarche
      v-for="demarche in demarches"
      :key="demarche.id" 
      :demarche="demarche"
    />
  </div>
</template>

<script>
import TitreDemarche from './demarche.vue'

export default {
  components: {
    TitreDemarche
  },

  props: {
    demarches: {
      type: Array,
      default: () => []
    }
  }
}
</script>
