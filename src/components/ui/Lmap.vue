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
      polygon: null,
      area: null
    }
  },

  computed: {
    center () {
      return this.polygon ? this.polygon.getBounds().getCenter() : { lat: 45, lng: 0 }
    }
  },

  created () {
    this.polygonInit()
  },

  mounted () {
    this.$refs.map.innerHTML = ''
    this.initMap()
    this.initLayers()
  },

  methods: {
    polygonInit () {
      this.polygon = null
      let polygonObj = {}

      this.geojson.features.forEach(f => {
        polygonObj[f.properties.type] = polygonObj[f.properties.type] || []
        polygonObj[f.properties.type].push([f.geometry.coordinates[1], f.geometry.coordinates[0]])
      })

      const polygon = Object.keys(polygonObj).map(p => polygonObj[p])
      this.polygon = L.polygon(polygon, { color: 'red' })
    },

    initMap () {
      if (this.map) {
        this.map.off()
      }
      this.map = L.map('map').setView(this.center, 5)
      this.map.fitBounds(this.polygon.getBounds())
      this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      this.tileLayer.addTo(this.map)
    },

    initLayers () {
      this.polygon.addTo(this.map)

      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }

      L.geoJSON(this.geojson, {
        pointToLayer (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      }).addTo(this.map)
    }
  }

}
</script>
