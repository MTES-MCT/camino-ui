<template>
  <div>
    <leaflet-map
      ref="carte" 
      :tiles-layer="tuilesCalque"
      :geojson-layers="geojsonLayers"
      :bounds="bords" />
    <div class="desktop-blobs">
      <div class="desktop-blob-1-2">
        <button
          class="btn-border px-m py-s"
          @click="$refs.carte.fit()">Centrer</button>
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
import LeafletMap from '@/components/leaflet/Map.vue'
import LeafletTilesSelector from '@/components/leaflet/TilesSelector.vue'

export default {
  components: {
    LeafletMap,
    LeafletTilesSelector
  },

  props: {
    geojson: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
      carte: null,
      geojsonLayers: [L.geoJSON(this.geojson)]
    }
  },

  computed: {
    bords () {
      return this.geojsonLayers[0].getBounds()
    },
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
    tuiles () {
      return this.$store.state.carte.tuiles
    },
    tuilesNom () {
      return this.$store.state.utilisateur.preferences.carte.tuilesNom
    }
  },

  methods: {
    tuilesNomSelectionner (tuileNom) {
      console.log('tuilesNomSelectionner', tuileNom);
      this.$store.commit('utilisateur/preferencesCarteTuilesNomSelectionner', tuileNom)
    }
  }

}
</script>
