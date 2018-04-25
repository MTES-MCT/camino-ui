<template>
  <div>
    <leaflet-map
      :tiles-layer="tilesLayer"
      :geojson-layers="geojsonLayers"
      :marker-layers="markerLayers"
      :bounds="bounds" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsName = 'fr'">Métropole</button>
          </li>
          <li>
            <button
              class="btn-border px-m py-s"
              @click="boundsName = 'gf'">Guyane</button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2">
        <Leaflet-tiles-selector />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import Accordion from '@/components/ui/Accordion.vue'
import LeafletMap from '@/components/leaflet/Map.vue'
import LeafletTilesSelector from '@/components/leaflet/TilesSelector.vue'

export default {
  components: {
    Accordion,
    LeafletMap,
    LeafletTilesSelector
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
      boundsName: 'fr',
      mocks: [
        {
          id: 'mineraux-rntm',
          type: 'mineraux',
          opacity: 0.25
        },
        {
          id: 'mineraux',
          type: 'mineraux',
          opacity: 0.5
        },
        {
          id: 'hydrocarbures',
          type: 'hydrocarbures',
          opacity: 0.5
        },
        {
          id: 'stockage',
          type: 'stockage',
          opacity: 0.5
        },
        {
          id: 'geothermie',
          type: 'geothermie',
          opacity: 0.5
        }
      ],
      geojsonLayers: [],
      markerLayers: []
    }
  },

  computed: {
    tilesLayer () {
      const t = this.$store.getters['map/tilesActive']
      return L.tileLayer(t.url, {
        attribution: t.attribution
      })
    },
    bounds () {
      const b = this.boundsList[this.boundsName]
      return L.geoJSON(b).getBounds()
    },
    domains () {
      return this.$store.state.lib.titre['domaines']
    }
  },

  mounted () {
    this.titlesInit()
    this.mocks.forEach(l => {
      this.mockGet(l.id).then(geojson => {
        this.mocksInit(l, geojson)
      })
    })
  },

  methods: {
    tilesSet () {

    },
    titlesInit () {
      this.titles.forEach(title => {
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

        const geojsonLayer = L.geoJSON(title['phases'][0].geojson, {
          filter: feature => feature.geometry.type === 'MultiPolygon',
          style: {
            fillColor: this.domains.find(d => d.id === title.domaine.id)['couleur'],
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

            this.markerLayers.push(titleMarker)
          }
        })

        this.geojsonLayers.push(geojsonLayer)
      })
    },

    mockGet (id) {
      return this.$store.dispatch('titles/mockGet', id)
    },

    mocksInit (mock, geojson) {
      const geojsonLayer = L.geoJSON(geojson, {
        style: {
          fillColor: this.domains.find(d => d.id === mock.type)['couleur'],
          fillOpacity: mock.opacity,
          weight: 0,
          opacity: 1,
          color: 'white'
        },
        onEachFeature: (feature, mock) => { }
      })

      this.geojsonLayers.unshift(geojsonLayer)
    }
  }
}
</script>
