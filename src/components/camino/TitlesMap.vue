<template>
  <div>
    <leaflet-map
      ref="map"
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
      geojsonLayers: [],
      markerLayers: []
    }
  },

  computed: {
    tilesLayer () {
      const tiles = this.$store.getters['map/tilesActive']
      return tiles.type === 'wms'
        ?
        L.tileLayer.wms(tiles.url, {
          layers: tiles.layers,
          format: 'image/png',
          attribution: tiles.attribution
        }) : L.tileLayer(tiles.url, {
          attribution: tiles.attribution
        })
    },
    bounds () {
      const b = this.boundsList[this.boundsName]
      return L.geoJSON(b).getBounds()
    },
    domains () {
      return this.$store.state.lib.titre.domaines
    }
  },

  mounted () {
    this.titlesInit()
  },

  methods: {
    titlesInit () {
      this.titles.forEach(title => {
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domain-${title.domaine.id} leaflet-marker-title`,
          html: title.domaine.id,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const popupHtml = `<h4 class="mb-s">${title.nom}</h4>`
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

        const geojsonLayer = L.geoJSON(title['phases'][0].geojsonMultiPolygon, {
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

    mapFit (zone) {
      console.log('map', zone, this.boundsName);
      if (this.boundsName === zone) {
        this.$refs.map.fit()
      } else {
        this.boundsName = zone
      }
    }
  }
}
</script>
