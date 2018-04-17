<template>
  <div>
    <div 
      id="map"
      ref="map"
      class="map mb">
      <div class="absolute px-s py-xs map-loader">
        <div class="h6">Loading…</div>
      </div>
    </div>
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
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
      <div class="desktop-blob-1-2">
        <accordion class="mb">
          <template slot="title">Fond de carte</template>
          <ul class="list-sans">
            <li
              v-for="tile in tiles"
              :key="tile.type">
              <label>
                <input
                  v-model="tileCurrent"
                  :value="tile.name"
                  type="radio"
                  class="mr-s"
                  @change="mapChange">
                {{ tile.name }}
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
import mapTiles from '@/conf/mapTiles.json'
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

  data() {
    return {
      map: null,
      tileLayer: null,
      geojsons: {
        fr: {
          type: 'LineString',
          coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString',
          coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        }
      },
      tiles: mapTiles,
      tileCurrent: 'Géoportail / Plan IGN',
      colors: {
        mineraux: '#498bd6',
        hydrocarbures: '#856940',
        stockage: '#8468b1',
        geothermie: '#d16c3e'
      },
      layers: [
        {
          id: 'mineraux-rntm',
          opacity: 0.5
        },
        {
          id: 'mineraux',
          opacity: 0.75
        },
        {
          id: 'hydrocarbures',
          opacity: 0.75
        },
        {
          id: 'stockage',
          opacity: 0.75
        },
        {
          id: 'geothermie',
          opacity: 0.5
        }
      ]
    }
  },

  mounted() {
    this.mapInit()
    this.mapFit('fr')
    this.layerInit()
    this.layers.forEach(l => {
      this.mockGet(l.id).then(geojson => {
        this.mockLayerInit(l, geojson)
      })
    })
  },

  methods: {
    mapInit() {
      this.map = L.map(this.$refs.map, {
        doubleClickZoom: false
      })
      this.mapTileAdd()

      L.control
        .scale({
          imperial: false
        })
        .addTo(this.map)
    },

    mapFit(zone) {
      const geojsonLayer = L.geoJSON(this.geojsons[zone])
      this.map.fitBounds(geojsonLayer.getBounds())
    },

    mapChange() {
      this.tileLayer.removeFrom(this.map)
      this.mapTileAdd()
    },

    mapTileAdd() {
      const tile = this.tiles.find(t => t.name === this.tileCurrent)
      this.tileLayer = L.tileLayer(tile.url, {
        maxZoom: 20,
        attribution: tile.attribution
      })

      this.tileLayer.addTo(this.map)
    },

    layerInit() {
      this.titles.forEach(title => {
        L.geoJSON(title.geojson, {
          filter: feature => feature.geometry.type === 'MultiPolygon',
          style: {
            fillColor: this.colors[title.domaine.id],
            fillOpacity: 0.75,
            weight: 0
          },
          onEachFeature: (feature, layer) => {
            L.marker(
              L.geoJSON(feature)
                .getBounds()
                .getCenter(),
              {
                icon: L.divIcon({
                  className: `h6 mono border-inverse color-bg py-xs px-s pill inline-block bg-title-domain-${title.domaine.code.toLowerCase()} leaflet-marker`,
                  html: title.domaine.code,
                  iconSize: null,
                  iconAnchor: [15.5, 36]
                })
              }
            ).addTo(this.map)

            layer.on({
              click: e => {
                console.log(e)
                this.$router.push({
                  name: 'titre',
                  params: { id: title.id }
                })
              }
            })
            layer.bindPopup('<p>name: ' + title.id + '</p>')
          }
        }).addTo(this.map)
      })
    },

    mockGet(id) {
      return this.$store.dispatch('titles/mockGet', id)
    },

    mockLayerInit(layer, geojson) {
      L.geoJSON(geojson, {
        style: {
          fillColor: this.colors[layer.id],
          fillOpacity: layer.opacity,
          weight: 0,
          opacity: 1,
          color: 'white'
        },
        onEachFeature: (feature, layer) => {}
      }).addTo(this.map)
    }
  }
}
</script>
