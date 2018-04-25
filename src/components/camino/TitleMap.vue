<template>
  <leaflet-map
    :geojson-layers="geojsonLayers"
    :bounds="bounds" />
</template>

<script>
import L from 'leaflet'
import LeafletMap from '@/components/ui/LeafletMap.vue'

export default {
  components: {
    LeafletMap
  },

  props: {
    geojson: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
      map: null,
      geojsonLayers: [L.geoJSON(this.geojson)]
    }
  },

  computed: {
    bounds () {
      return this.geojsonLayers[0].getBounds()
    }
  }

}
</script>
