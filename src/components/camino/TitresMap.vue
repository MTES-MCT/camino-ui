<template>
  <div>
    <leaflet-map
      ref="map"
      :tiles-layer="tuilesCalque"
      :geojson-layers="geojsonCalques"
      :marker-layers="marqueurCalques"
      :bounds="bounds" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <ul class="list-inline">
          <li>
            <button
              class="btn-border px-m py-s"
              @click="carteCentrer('fr')">Métropole</button>
          </li>
          <li>
            <button
              class="btn-border px-m py-s"
              @click="carteCentrer('gf')">Guyane</button>
          </li>
        </ul>
      </div>
      <div class="desktop-blob-1-2">
        <Leaflet-tiles-selector
          :tiles="tuiles"
          :tiles-name="tuilesNom"
          @tiles-name-set="tuilesNomSelectionner" />
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
    titres: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      bords: {
        fr: {
          type: 'LineString',
          coordinates: [[-5.1406, 41.3337], [9.5593, 51.0891]]
        },
        gf: {
          type: 'LineString',
          coordinates: [[-54.5425, 2.1271], [-51.6139, 5.7765]]
        }
      },
      bordsNom: 'fr',
      geojsonCalques: [],
      marqueurCalques: []
    }
  },

  computed: {
    tuilesCalque () {
      const tuiles = this.$store.getters['carte/tuilesActive']
      return tuiles.type === 'wms'
        ?
        L.tileLayer.wms(tuiles.url, {
          layers: tuiles.layers,
          format: 'image/png',
          attribution: tuiles.attribution
        }) : L.tileLayer(tuiles.url, {
          attribution: tuiles.attribution
        })
    },
    bounds () {
      const b = this.bords[this.bordsNom]
      return L.geoJSON(b).getBounds()
    },
    domaines () {
      return this.$store.state.titres.domaines
    },
    tuiles () {
      return this.$store.state.carte.tuiles
    },
    tuilesNom () {
      return this.$store.state.utilisateur.preferences.carte.tuilesNom
    }
  },

  watch: {
    titres: 'titresInit'
  },

  mounted () {
    this.titresInit()
  },

  methods: {
    titresInit () {
      this.marqueurCalques = []
      this.geojsonCalques = []
      this.titres.forEach(titre => {
        const icon = L.divIcon({
          className: `h6 mono border-bg color-bg py-xs px-s pill inline-block bg-title-domain-${titre.domaine.id} leaflet-marker-title cap`,
          html: titre.domaine.id,
          iconSize: null,
          iconAnchor: [15.5, 38]
        })
        const popupHtml = `<h4 class="mb-s">${titre.nom}</h4>`
        const popupOptions = {
          closeButton: false,
          offset: [0, -24]
        }
        const titleRoute = {
          name: 'titre',
          params: { id: titre.id }
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

        const geojsonLayer = L.geoJSON(titre.perimetres[0].geojsonMultiPolygon, {
          filter: feature => feature.geometry.type === 'MultiPolygon',
          style: {
            fillColor: this.domaines.couleur,
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

            this.marqueurCalques.push(titleMarker)
          }
        })

        this.geojsonCalques.push(geojsonLayer)
      })
    },

    carteCentrer (zone) {
      if (this.bordsNom === zone) {
        this.$refs.map.fit()
      } else {
        this.bordsNom = zone
      }
    },

    tuilesNomSelectionner (tuileNom) {
      console.log('tuilesNomSelectionner', tuileNom);
      this.$store.commit('utilisateur/preferencesCarteTuilesNomSelectionner', tuileNom)
    }
  }
}
</script>
