<template>
  <Download
    :type="'geojson'"
    :content="content"
    :name="name"
  />
</template>

<script>
import Download from '../ui/download.vue'
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
      return this.fileNameCreate(`camino-${this.titre.id}`, 'geojson')
    },

    content() {
      const titresFormatGeojson = titre => ({
        type: 'FeatureCollection',
        properties: {
          id: titre.id,
          nom: titre.nom
        },
        features: [titre.geojsonMultiPolygon, ...titre.geojsonPoints.features]
      })

      return JSON.stringify(
        jsonTypenameOmit(titresFormatGeojson(this.titre)),
        null,
        2
      )
    }
  }
}
</script>
