<template>
  <div>
    <div 
      id="map"
      ref="map"
      class="map mb" />
    
    <ul class="list-inline">
      <li>
        <button
          class="btn-border px-m py-s"
          @click="mapFit('global')">Ensemble</button>
      </li>
      <li>
        <button
          class="btn-border px-m py-s"
          @click="mapFit('fr')">Métropole</button>
      </li>
      <li>
        <button
          class="btn-border px-m py-s"
          @click="mapFit('gf')">Guyane</button>
      </li>
    </ul>
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
    titles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      map: null,
      tileLayer: null,
      geojsons: {
        fr: {
          type: "LineString", coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString', coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        },
        global: []
      }
    }
  },

  mounted () {
    this.mapInit()
    this.layerInit()
  },

  methods: {
    mapInit () {
      this.map = L.map('map')
      this.tileLayer = L.tileLayer("https://wxs.ign.fr/pratique/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      this.tileLayer.addTo(this.map)
      L.control.scale({
        imperial: false
      }).addTo(this.map)
    },

    layerInit () {
      this.geojsons.global = []
      this.titles.forEach(title => {
        const geojson = title.geojson.features.find(feature => feature.geometry.type === 'MultiPolygon')
        geojson.properties = geojson.properties || {}
        geojson.properties.id = title.id
        this.geojsons.global.push(geojson)
      })

      const geojsonLayer = L.geoJSON(this.geojsons.global, {
        onEachFeature: (feature, layer) => {
          layer.on({
            click: (e) => {
              console.log(e)
              this.$router.push({ name: 'titre', params: { id: feature.properties.id } })
            }
          })
        }
      }).addTo(this.map)

      this.map.fitBounds(geojsonLayer.getBounds())
    },

    mapFit (zone) {
      const geojsonLayer = L.geoJSON(this.geojsons[zone])
      this.map.fitBounds(geojsonLayer.getBounds())
    }
  }

}
</script>
