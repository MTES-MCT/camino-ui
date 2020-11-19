<template>
  <div id="map" ref="map">
    <div class="absolute pl-s pr-l py-xs map-loader">
      <div class="h6">Zoom: {{ zoom }}</div>
    </div>
  </div>
</template>

<script>
import {
  leafletMap,
  leafletTileLayerDefault,
  leafletScaleAdd,
  leafletFeatureGroupGet,
  leafletCanvasLayerAdd,
  leafletCanvasMarkerCreate
} from './map.js'

export default {
  props: {
    geojsonLayers: { type: Array, default: () => [] },
    markerLayers: { type: Array, default: () => [] },
    tilesLayer: { type: Object, default: () => leafletTileLayerDefault }
  },

  data() {
    return {
      map: null,
      zoom: 0,
      updateBboxOnly: false,
      updateCenterAndZoomOnly: false,
      layers: {
        tiles: {},
        geojsons: [],
        markers: [],
        canvas: null
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
    this.canvasMarkersAdd()
  },

  methods: {
    init() {
      this.map = leafletMap(this.$refs.map)

      this.map.on('moveend', () => {
        if (this.updateBboxOnly) {
          this.updateBboxOnly = false
          const bbox = this.boundsGet()

          this.$emit('map-update', { bbox })
        } else {
          const center = [this.map.getCenter().lat, this.map.getCenter().lng]
          const zoom = this.map.getZoom()
          this.zoom = zoom

          if (this.updateCenterAndZoomOnly) {
            this.updateCenterAndZoomOnly = false
            this.$emit('map-update', { center, zoom })
          } else {
            const bbox = this.boundsGet()

            this.$emit('map-update', { center, zoom, bbox })
          }
        }
      })

      this.map.on('fullscreenchange', () => {
        if (this.map.isFullscreen()) {
          this.map.gestureHandling.disable()
        } else {
          this.map.gestureHandling.enable()
        }
      })

      this.zoom = this.map.getZoom()
    },

    boundsFit(bounds) {
      this.map.fitBounds(bounds)
    },

    allFit(bounds) {
      const featureGroup = leafletFeatureGroupGet(this.layers.markers)
      this.updateCenterAndZoomOnly = true
      this.boundsFit(featureGroup.getBounds())
    },

    zoomSet(zoom) {
      if (zoom !== this.zoom) {
        this.map.setZoom(zoom)
      }
    },

    positionSet({ zoom, center }) {
      this.updateBboxOnly = true
      this.map.setView(center, zoom)
      this.zoom = zoom
    },

    boundsGet() {
      const bounds = this.map.getBounds()

      return [
        bounds._southWest.lng,
        bounds._southWest.lat,
        bounds._northEast.lng,
        bounds._northEast.lat
      ]
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
    },

    canvasMarkersAdd() {
      this.layers.canvas = leafletCanvasLayerAdd({})
      this.layers.canvas.addTo(this.map)
      console.log(this.layers.canvas._map)

      this.layers.canvas.addOnClickListener(function(e, data) {
        console.log(data)
      })

      this.layers.canvas.addOnHoverListener(function(e, data) {
        console.log(data[0].data._leaflet_id)
      })

      var markers = []
      for (var i = 0; i < 10000; i++) {
        var marker = leafletCanvasMarkerCreate(
          [58.5578 + Math.random() * 1.8, 29.0087 + Math.random() * 3.6],
          i
        )
        markers.push(marker)
      }

      setTimeout(() => {
        this.layers.canvas.addLayers(markers)
      }, 1000)
    }
  }
}
</script>
