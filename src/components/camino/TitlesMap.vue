<template>
  <div>
    <div 
      id="map"
      ref="map"
      class="map mb" />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-2">
        <ul class="list-inline">
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
      <div class="tablet-blob-1-2">
        <accordion>
          <template slot="title">Fond de carte</template>
          <ul class="list-sans">
            <li
              v-for="(tile, tileName ) in tiles"
              :key="tile.type">
              <label>
                <input
                  v-model="tileCurrent"
                  :value="tileName"
                  type="radio"
                  class="mr-s"
                  @change="mapChange">
                {{ tileName }}
              </label>
            </li>
          </ul>
        </accordion>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import Accordion from '@/components/ui/Accordion.vue'
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
  components: {
    Accordion
  },

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
      },
      tiles: {
        'osm / fr': {
          url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        'osm / hot': {
          url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        },
        'Géoportail / Cartes IGN': {
          url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
          attribution: 'IGN-F/Geoportail'
        },
        'Géoportail / Cartes SCAN Express Standard': {
          url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
          attribution: 'IGN-F/Geoportail'
        },
        'Géoportail / Plan IGN': {
          url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGN&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
          attribution: 'IGN-F/Geoportail'
        }
      },
      tileCurrent: 'osm / fr'
    }
  },

  mounted () {
    this.mapInit()
    this.layerInit()
  },

  methods: {
    mapInit () {
      this.map = L.map('map')

      this.mapTileAdd()

      L.control.scale({
        imperial: false
      }).addTo(this.map)
    },

    mapTileAdd () {
      this.tileLayer = L.tileLayer(this.tiles[this.tileCurrent].url, {
        maxZoom: 20,
        attribution: this.tiles[this.tileCurrent].attribution
      })

      this.tileLayer.addTo(this.map)
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
    },

    mapChange () {
      this.tileLayer.removeFrom(this.map)
      this.mapTileAdd()
    }
  }

}
</script>
