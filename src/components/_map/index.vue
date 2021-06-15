<template>
  <div ref="map">
    <div class="absolute pl-s pr-l py-xs map-loader">
      <div class="small">Zoom: {{ zoom }}</div>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue'

import {
  leafletMap,
  leafletTileLayerDefault,
  leafletScaleBuild,
  leafletFeatureGroupGet,
  leafletCanvasLayerBuild
} from './leaflet.js'

export default {
  props: {
    geojsonLayers: { type: Array, default: () => [] },
    markerLayers: { type: Array, default: () => [] },
    tilesLayer: { type: Object, default: () => leafletTileLayerDefault },
    canvasMarkers: { type: Array, default: () => [] }
  },

  emits: ['map-update'],

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
    markerLayers: 'markersUpdate',
    canvasMarkers: 'canvasMarkersUpdate'
  },

  mounted() {
    this.init()
    this.scaleAdd()
    this.tilesAdd()
    this.markersAdd()
    this.geojsonsAdd()
    this.layersCanvasAdd()
  },

  methods: {
    init() {
      this.map = markRaw(leafletMap(this.$refs.map))

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

    allFit() {
      const featureGroup = leafletFeatureGroupGet(this.layers.markers)
      this.updateCenterAndZoomOnly = true
      this.boundsFit(featureGroup.getBounds())
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
      const scale = leafletScaleBuild()
      scale.addTo(this.map)
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
      this.geojsonLayers.forEach(l => {
        this.layers.geojsons.push(l)
        l.addTo(this.map)
      })
    },

    geojsonsUpdate() {
      this.layers.geojsons.forEach(l => l.remove())

      this.geojsonsAdd()
    },

    markersAdd() {
      this.markerLayers.forEach(marker => {
        this.layers.markers.push(marker)
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

    canvasMarkersUpdate() {
      const markers = []
      this.canvasMarkers.forEach((marker, i) => {
        markers.push(marker)
      })
      this.layers.canvas.clear()
      this.layers.canvas.addMarkers(markers)
      if (!markers.length) {
        this.layers.canvas._canvas.classList.add('hide')
      } else {
        this.layers.canvas._canvas.classList.remove('hide')
      }
    },

    layersCanvasAdd() {
      this.map.createPane('canvas')
      this.layers.canvas = leafletCanvasLayerBuild({ pane: 'canvas' })
      this.layers.canvas.addTo(this.map)
    }
  }
}
</script>
