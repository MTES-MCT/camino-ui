<template>
  <leaflet-map
    :geojsons="geojsonLayers"/>
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
      geojsonLayers: []
    }
  },

  mounted () {
    this.layersInit()
  },

  methods: {
    layersInit () {
      this.geojsonLayers.push(L.geoJSON(this.geojson))
      // this.map.fitBounds(geojsonLayer.getBounds())
    }
  }

}
</script>
