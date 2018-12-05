<template>
  <div>
    <LeafletMap
      ref="map" 
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :bounds="bounds"
      @map-zoom="zoomGet"
    />
    <MapWarningBrgm 
      :zoom="zoom"
      :tiles-name="tilesName"
    />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2 mb">
        <button
          class="btn-border pill px-m py-s"
          @click="center"
        >
          Centrer
        </button>
      </div>
      <div class="desktop-blob-1-2">
        <LeafletTilesSelector
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
      default: () => {}
    }
  },

  data () {
    return {
      map: null,
      geojsonLayers: [L.geoJSON(this.geojson)],
      zoom: 0
    }
  },

  computed: {
    bounds () {
      return this.geojsonLayers[0].getBounds()
    },

    tilesLayer () {
      const tiles = this.$store.getters['user/tilesActive']
      return tiles.type === 'wms'
        ? L.tileLayer.wms(tiles.url, {
            layers: tiles.layers,
            format: 'image/png',
            attribution: tiles.attribution
          })
        : L.tileLayer(tiles.url, {
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
      return (
        this.tilesName === 'BRGM / Cartes géologiques 1/50 000' &&
        (this.zoom < 12 || this.zoom > 16)
      )
    }
  },

  mounted () {
    this.center()
  },

  methods: {
    tilesNameSelect (tuileNom) {
      console.log(tuileNom)
      this.$store.commit('user/preferencesUpdate', {
        key: 'tilesName',
        value: tuileNom
      })
    },

    zoomGet (zoom) {
      this.zoom = zoom
    },

    center () {
      this.$refs.map.fitBounds(this.bounds)
    }
  }
}
</script>
