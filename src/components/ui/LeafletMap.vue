<template>
  <div 
    id="map"
    ref="map"
    class="map mb">
    <div class="absolute px-s py-xs map-loader hide">
      <div class="h6">Loading…</div>
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
    geojsons: {
      type: Array,
      default: () => []
    },
    markers: {
      type: Array,
      default: () => []
    },
    tiles: {
      type: Object,
      default: () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    },
    bounds: {
      type: Object,
      default: () => L.geoJSON({
        type: 'LineString',
        coordinates: [[-85, 60], [85, -30]]
      }).getBounds()
    }
  },

  data () {
    return {
      map: null,
      layers: {
        tiles: {},
        geojsons: [],
        markers: []
      }
    }
  },

  watch: {
    bounds: 'mapFit',
    tiles: 'tilesUpdate',
    geojsons: 'geojsonsUpdate',
    markers: 'markersUpdate'
  },

  mounted () {
    this.mapInit()
    this.mapFit()
    this.geojsonsAdd()
    this.markersAdd()
  },

  methods: {
    mapInit () {
      this.map = L.map(this.$refs.map, {
        doubleClickZoom: false
      })
      this.tilesAdd()

      L.control
        .scale({
          imperial: false
        })
        .addTo(this.map)
    },

    mapFit () {
      this.map.fitBounds(this.bounds)
    },

    tilesUpdate () {
      this.layers.tiles.removeFrom(this.map)
      this.tilesAdd()
    },

    tilesAdd () {
      this.layers.tiles = this.tiles
      this.layers.tiles.addTo(this.map)
    },

    geojsonsAdd () {
      this.layers.geojsons = this.geojsons
      this.layers.geojsons.forEach(l => l.addTo(this.map))
    },

    geojsonsUpdate () {
      this.layers.geojsons.forEach(l => l.remove())
      this.geojsonsAdd()
    },

    markersAdd () {
      this.layers.markers = this.markers
      this.layers.markers.forEach(m => m.addTo(this.map))
    },

    markersUpdate () {
      this.layers.markers.forEach(m => m.remove())
      this.markersAdd()
    }
  }
}
</script>
