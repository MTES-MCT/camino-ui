<template>
  <div
    id="map"
    ref="map"
    class="map mb"
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
      layers: {
        tiles: {},
        geojsons: [],
        markers: []
      },
      center: null
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
        zoomControl: true,
        doubleClickZoom: false,
        minZoom: 3,
        gestureHandling: true,
        gestureHandlingOptions: {
          text: {
            touch: 'Utilisez deux doigts pour zoomer',
            scroll: 'Utilisez ctrl + scroll pour zoomer',
            scrollMac: 'Utilisez \u2318 + scroll pour zoomer'
          }
        }
      })

      this.map.on('zoomend', () => {
        this.zoom = this.map.getZoom()
        this.$emit('map-zoom', this.zoom)
      })

      this.map.on('moveend', () => {
        this.center = this.map.getCenter()
        const centre = `${this.center.lat.toFixed(7)},${this.center.lng.toFixed(
          7
        )}`

        this.$emit('map-center', centre)
      })
    },

    fitBounds(bounds) {
      this.map.fitBounds(bounds)
    },

    centerSet(center) {
      this.map.panTo(center)
    },

    zoomSet(zoom) {
      this.map.setZoom(zoom)
      this.zoom = this.map.getZoom()
      this.$emit('map-zoom', this.zoom)
    },

    scaleAdd() {
      L.control
        .scale({
          imperial: false
        })
        .addTo(this.map)
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
