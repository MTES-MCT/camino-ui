<template>
  <Download
    :query="{ id: titreId }"
    section="titre"
    format="geojson"
    class="btn-border small pill pl pr-m py-s flex"
  >
    geojson
  </Download>
</template>

<script>
import Download from '../_common/download.vue'

export default {
  components: {
    Download
  },

  props: {
    titreId: { type: String, required: true }
  }
}
</script>
