<template>
  <div>
    <leaflet-map
      ref="map" 
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :bounds="bounds"
      @zoom-level="zoomLevelGet"
    />
    <map-warning-brgm 
      :zoom-level="zoomLevel"
      :tiles-name="tilesName"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2 mb">
        <button
          class="btn-border pill px-m py-s"
          @click="$refs.map.fit()"
        >Centrer</button>
      </div>
      <div class="desktop-blob-1-2">
        <Leaflet-tiles-selector
          :tiles="tiles"
          :tiles-name="tilesName"
          @tiles-name-set="tilesNameSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import LeafletMap from '../leaflet/map.vue'
import LeafletTilesSelector from '../leaflet/tiles-selector.vue'
import MapWarningBrgm from '../leaflet/warning-brgm.vue'

export default {
  components: {
    MapWarningBrgm,
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
      geojsonLayers: [L.geoJSON(this.geojson)],
      zoomLevel: 0
    }
  },

  computed: {
    bounds () {
      return this.geojsonLayers[0].getBounds()
    },

    tilesLayer () {
      const tiles = this.$store.getters['user/tilesActive']
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
    },

    brgmWarning () {
      return this.tilesName === "BRGM / Cartes géologiques 1/50 000" && (this.zoomLevel < 12 || this.zoomLevel > 16)
    }
  },

  methods: {
    tilesNameSelect (tuileNom) {
      this.$store.commit('user/preferencesMapTilesNameSelect', tuileNom)
    },

    zoomLevelGet (zoomLevel) {
      this.zoomLevel = zoomLevel
    }
  }

}
</script>
