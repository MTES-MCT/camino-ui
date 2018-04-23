<template>
  <div>
    <leaflet-map
      :tiles="tilesCurrent"
      :layers="[]"
      :markers="[]"
      :bounds="boundsCurrent" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsCurrentName = 'fr'">Métropole</button>
          </li>
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsCurrentName = 'gf'">Guyane</button>
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
                  v-model="tilesCurrentName"
                  :value="tile.name"
                  type="radio"
                  class="mr-s"
                  @change="tilesCurrentName = tile.name">
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
import LeafletMap from '@/components/ui/LeafletMap.vue'

export default {
  components: {
    Accordion,
    LeafletMap
  },

  props: {
    titles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      boundsList: {
        fr: {
          type: 'LineString',
          coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString',
          coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        }
      },
      boundsCurrentName: 'fr',
      tiles: mapTiles,
      tilesCurrentName: 'Géoportail / Plan IGN',
      colors: {
        mineraux: '#498bd6',
        'mineraux-rntm': '#498bd6',
        hydrocarbures: '#856940',
        stockage: '#8468b1',
        geothermie: '#d16c3e'
      },
      mocks: [
        {
          id: 'mineraux-rntm',
          opacity: 0.25
        },
        {
          id: 'mineraux',
          opacity: 0.5
        },
        {
          id: 'hydrocarbures',
          opacity: 0.5
        },
        {
          id: 'stockage',
          opacity: 0.5
        },
        {
          id: 'geothermie',
          opacity: 0.5
        }
      ],
      titleLayers: [],
      titleMarkers: []
    }
  },

  computed: {
    tilesCurrent () {
      const t = this.tiles.find(t => t.name === this.tilesCurrentName)
      return L.tileLayer(t.url, {
        maxZoom: 20,
        attribution: t.attribution
      })
    },
    boundsCurrent () {
      const b = this.boundsList[this.boundsCurrentName]
      return L.geoJSON(b).getBounds()

    }
  },

  mounted () {

  },

  methods: {
    tilesSet () {

    },
    titleLayersInit () {
      this.titleLayers = this.titles.map(title => {
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domain-${title.domaine.code.toLowerCase()} leaflet-marker-title`,
          html: title.domaine.code,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const popupHtml = `<h4 class="mb-s">${title['nom']}</h4>`
        const popupOptions = {
          closeButton: false,
          offset: [0, -24]
        }
        const titleRoute = {
          name: 'titre',
          params: { id: title.id }
        }
        const methods = {
          click: () => {
            this.$router.push(titleRoute)
          },
          mouseover (e) {
            this.openPopup()
          },
          mouseout (e) {
            this.closePopup()
          }
        }

        return L.geoJSON(title['phases'][0].geojson, {
          filter: feature => feature.geometry.type === 'MultiPolygon',
          style: {
            fillColor: this.colors[title.domaine.id],
            fillOpacity: 0.75,
            weight: 0
          },
          onEachFeature: (feature, layer) => {
            const titleMarker = L.marker(
              L.geoJSON(feature)
                .getBounds()
                .getCenter(),
              { icon }
            )

            titleMarker.bindPopup(popupHtml, popupOptions)
            titleMarker.on(methods)

            layer.bindPopup(popupHtml, popupOptions)
            layer.on(methods)

            this.titleMarkers.push(titleMarker)
          }
        })
      })
    }
  }
}
</script>
