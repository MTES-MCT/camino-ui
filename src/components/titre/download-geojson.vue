<template>
  <Download :name="titre.id" section="titre" format="geojson">
    geojson
  </Download>
</template>

<script>
import Download from '../_common/download-client.vue'

export default {
  components: {
    Download
  },

  props: {
    titre: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
