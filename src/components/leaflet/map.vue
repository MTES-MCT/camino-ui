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
import L from 'leaflet'

import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet.fullscreen'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

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
      default: () =>
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
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
      L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

      this.map = L.map(this.$refs.map, {
        // zoomControl: true,
        fullscreenControl: true,
        doubleClickZoom: false,
        minZoom: 4,
        gestureHandling: true
      })

      this.map.on('moveend', () => {
        if (this.preventMoveend) {
          this.preventMoveend = false
        } else {
          const center = [this.map.getCenter().lat, this.map.getCenter().lng]
          const zoom = this.map.getZoom()
          this.zoom = zoom
          this.$emit('update', { center, zoom })
          // L.Util.throttle(this.$emit('update', { center, zoom }), 2000, this)
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
      L.control.scale({ imperial: false }).addTo(this.map)
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

    markersUpdate() {
      this.layers.markers.forEach(marker => {
        this.map.removeLayer(marker)
      })
      this.markersAdd()
    }
  }
}
</script>

<style src="../../../node_modules/leaflet.fullscreen/Control.FullScreen.css" />