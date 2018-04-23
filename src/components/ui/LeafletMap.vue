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
    layers: {
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
      tilesLayer: null,
    }
  },

  watch: {
    bounds: 'mapFit',
    tiles: 'mapTilesChange'
  },

  mounted () {
    this.mapInit()
    this.mapFit()
    this.layersAdd()
    this.markersAdd()
  },

  methods: {
    mapInit () {
      this.map = L.map(this.$refs.map, {
        doubleClickZoom: false
      })
      this.mapTilesAdd()

      L.control
        .scale({
          imperial: false
        })
        .addTo(this.map)
    },

    mapFit () {
      console.log('b', this.bounds)

      this.map.fitBounds(this.bounds)
    },

    mapTilesChange () {
      this.tilesLayer.removeFrom(this.map)
      this.mapTilesAdd()
    },

    mapTilesAdd () {
      this.tilesLayer = this.tiles
      this.tilesLayer.addTo(this.map)
    },

    layersAdd () {
      this.layers.forEach(l => l.addTo(this.map))
    },

    markersAdd () {
      this.markers.forEach(m => m.addTo(this.map))
    },

    layersRemove () {
      this.layers.forEach(l => l.remove())
    },

    markersRemove () {
      this.markers.forEach(m => m.remove())
    }
  }
}
</script>
