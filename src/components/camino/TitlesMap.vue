<template>
  <div 
    id="map"
    ref="map"
    class="map mb" />
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
    titles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      map: null,
      tileLayer: null
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
      const polygons = []
      this.titles.forEach(title => {
        const geojson = title.geojson.features.find(feature => feature.geometry.type === 'MultiPolygon')
        geojson.properties = geojson.properties || {}
        geojson.properties.id = title.id
        polygons.push(geojson)

      })

      const n = L.geoJSON(polygons, {
        onEachFeature: (feature, layer) => {
          layer.on({
            click: (e) => {
              console.log(e)
              this.$router.push({ name: 'titre', params: { id: feature.properties.id } })
            }
          })
        }
      }).addTo(this.map)

      this.map.fitBounds(n.getBounds())
    }
  }

}
</script>
