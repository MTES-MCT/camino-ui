<template>
  <Download
    :name="titre.id"
    type="geojson"
    :content-build="contentBuild"
  >
    geojson
  </Download>
</template>

<script>
import Download from '../_ui/download.vue'
import { jsonTypenameOmit } from '../../utils/index'

export default {
  components: {
    Download
  },

  props: {
    titre: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    contentBuild() {
      return JSON.stringify(
        {
          type: 'FeatureCollection',
          properties: {
            id: this.titre.id,
            nom: this.titre.nom
          },
          features: jsonTypenameOmit([
            this.titre.geojsonMultiPolygon,
            ...this.titre.geojsonPoints.features
          ])
        },
        null,
        2
      )
    }
  }
}
</script>
