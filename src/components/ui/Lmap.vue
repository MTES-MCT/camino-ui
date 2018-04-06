<template>
  <div 
    id="map"
    ref="map"
    class="map" />
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
    geojson: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
      map: null,
      tileLayer: null,
      area: null
    }
  },

  mounted () {
    this.initMap()
    this.initLayers()
  },

  methods: {
    initMap () {
      this.map = L.map('map')
      this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      this.tileLayer.addTo(this.map)
    },

    initLayers () {
      const geogsonLayer = L.geoJSON(this.geojson).addTo(this.map)
      this.map.fitBounds(geogsonLayer.getBounds())
    }
  }

}
</script>
