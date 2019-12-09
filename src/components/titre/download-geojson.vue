<template>
  <Download
    :type="'geojson'"
    :content="content"
    :name="name"
  />
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
  computed: {
    name() {
      return this.fileNameCreate(this.titre.id, 'geojson')
    },

    content() {
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
