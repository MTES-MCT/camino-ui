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
        <Leaflet-tiles-selector
          :tiles="tiles"
          :tiles-name="tilesName"
          @tiles-name-set="tilesNameSelect" />
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
      const tiles = this.$store.getters['map/tilesActive']
      return tiles.type === 'wms'
        ?
        L.tileLayer.wms(tiles.url, {
          layers: tiles.layers,
          format: 'image/png',
          attribution: tiles.attribution
        }) : L.tileLayer(tiles.url, {
          attribution: tiles.attribution
        })
    },
    tiles () {
      return this.$store.state.map.tiles
    },
    tilesName () {
      return this.$store.state.user.preferences.map.tilesName
    }
  },

  methods: {
    tilesNameSelect (tuileNom) {
      console.log('tilesNameSelect', tuileNom);
      this.$store.commit('user/preferencesMapTilesNameSelect', tuileNom)
    }
  }

}
</script>
