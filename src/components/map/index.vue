<template>
  <div
    id="map"
    ref="map"
  >
    <div class="absolute px-s py-xs map-loader">
      <div class="h6">
        Zoom: {{ zoom }}
      </div>
    </div>
  </div>
</template>

<script>
import { leafletMap, leafletTileLayerDefault, leafletScaleAdd } from './map.js'

export default {
  props: {
    geojsonLayers: {
      type: Array,
      default: () => []
    },
    markerLayers: {
      type: Array,
      default: () => []
    },
    tilesLayer: {
      type: Object,
      default: () => leafletTileLayerDefault
    }
  },

  data() {
    return {
      map: null,
      zoom: 0,
      preventMoveend: false,
      layers: {
        tiles: {},
        geojsons: [],
        markers: []
      }
    }
  },

  watch: {
    tilesLayer: 'tilesUpdate',
    geojsonLayers: 'geojsonsUpdate',
    markerLayers: 'markersUpdate'
  },

  mounted() {
    this.init()
    this.scaleAdd()
    this.tilesAdd()
    this.markersAdd()
    this.geojsonsAdd()
  },

  methods: {
    init() {
      this.map = leafletMap(this.$refs.map)

      this.map.on('moveend', () => {
        if (this.preventMoveend) {
          this.preventMoveend = false
        } else {
          const center = `${this.map.getCenter().lat},${
            this.map.getCenter().lng
          }`
          const zoom = this.map.getZoom()
          this.zoom = zoom
          this.$emit('map:update', { center, zoom })
        }
      })

      this.map.on('fullscreenchange', () => {
        if (this.map.isFullscreen()) {
          this.map.gestureHandling.disable()
          // console.log('entered fullscreen', this.map.gestureHandling.enabled())
        } else {
          this.map.gestureHandling.enable()
          // console.log('exited fullscreen', this.map.gestureHandling)
        }
      })

      this.zoom = this.map.getZoom()
    },

    fitBounds(bounds) {
      this.map.fitBounds(bounds)
    },

    centerSet(center) {
      if (JSON.stringify(center) !== JSON.stringify(this.center)) {
        this.map.panTo(center)
      }
    },

    zoomSet(zoom) {
      if (zoom !== this.zoom) {
        this.map.setZoom(zoom)
      }
    },

    positionSet({ zoom, center }) {
      this.preventMoveend = true
      this.map.setView(center, zoom)
      this.zoom = zoom
    },

    scaleAdd() {
      leafletScaleAdd(this.map)
    },

    tilesUpdate() {
      this.layers.tiles.removeFrom(this.map)
      this.tilesAdd()
    },

    tilesAdd() {
      this.layers.tiles = this.tilesLayer
      this.layers.tiles.addTo(this.map)
    },

    geojsonsAdd() {
      this.layers.geojsons = this.geojsonLayers
      this.layers.geojsons.forEach(l => {
        l.addTo(this.map)
      })
    },

    geojsonsUpdate() {
      this.layers.geojsons.forEach(l => l.remove())
      this.geojsonsAdd()
    },

    markersAdd() {
      this.layers.markers = this.markerLayers

      this.layers.markers.forEach(marker => {
        this.map.addLayer(marker)
      })
    },

    hasLayer(layer) {
      return this.map.hasLayer(layer)
    },

    markersUpdate() {
      this.layers.markers.forEach(marker => {
        this.map.removeLayer(marker)
      })

      this.markersAdd()
    }
  }
}
</script>
