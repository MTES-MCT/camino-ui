<template>
  <div 
    id="map"
    ref="map"
    class="map mb"
  >
    <div class="absolute px-s py-xs map-loader">
      <div class="h6">Zoom: {{ zoomLevel }}</div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
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
      default: () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    },
    bounds: {
      type: Object,
      default: () => L.latLngBounds(L.latLng(60, -85), L.latLng(-30, 85))
    }
  },

  data () {
    return {
      map: null,
      zoomLevel: 0,
      position: null,
      layers: {
        tiles: {},
        geojsons: [],
        markers: []
      }
    }
  },

  watch: {
    bounds: 'fit',
    tilesLayer: 'tilesUpdate',
    geojsonLayers: 'geojsonsUpdate',
    markerLayers: 'markersUpdate'
  },

  mounted () {
    this.init()
    this.fit()
    this.scaleAdd()
    this.tilesAdd()
    this.geojsonsAdd()
    this.markersAdd()
  },

  methods: {
    init () {
      this.map = L.map(this.$refs.map, {
        doubleClickZoom: false
      })

      this.map.on('zoomend', () => {
        this.zoomLevel = this.map.getZoom()
        this.$emit('zoom-level', this.zoomLevel)
      })

      this.map.on('moveend', () => {
        this.position = this.map.getBounds()
      })
    },

    fit () {
      this.map.fitBounds(this.bounds)
    },

    scaleAdd () {
      L.control
        .scale({
          imperial: false
        })
        .addTo(this.map)
    },

    tilesUpdate () {
      this.layers.tiles.removeFrom(this.map)
      this.tilesAdd()
    },

    tilesAdd () {
      this.layers.tiles = this.tilesLayer
      this.layers.tiles.addTo(this.map)
    },

    geojsonsAdd () {
      this.layers.geojsons = this.geojsonLayers
      this.layers.geojsons.forEach(l => l.addTo(this.map))
    },

    geojsonsUpdate () {
      this.layers.geojsons.forEach(l => l.remove())
      this.geojsonsAdd()
    },

    markersAdd () {
      this.layers.markers = this.markerLayers
      this.layers.markers.forEach(m => m.addTo(this.map))
    },

    markersUpdate () {
      this.layers.markers.forEach(m => m.remove())
      this.markersAdd()
    }
  }
}
</script>
