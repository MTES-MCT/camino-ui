<template>
  <div>
    <leaflet-map
      ref="map" 
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :bounds="bounds" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <button
          class="btn-border px-m py-s"
          @click="$refs.map.fit()">Centrer</button>
      </div>
      <div class="desktop-blob-1-2">
        <Leaflet-tiles-selector />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import LeafletMap from '@/components/leaflet/Map.vue'
import LeafletTilesSelector from '@/components/leaflet/TilesSelector.vue'

export default {
  components: {
    LeafletMap,
    LeafletTilesSelector
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
    },
    tilesLayer () {
      const t = this.$store.getters['map/tilesActive']
      return L.tileLayer(t.url, {
        attribution: t.attribution
      })
    }
  },

  methods: {
    truc () {
      this.$refs.map.mapFit()
    }
  }

}
</script>
