<template>
  <accordion 
    class="mb" 
    :sub="true"
  >
    <template slot="title"><dot :color="`bg-${etape.statut.couleur}`" /><span class="cap-first">{{ etape.type.nom }}</span></template>
    <template slot="sub">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>Date</h6>
          <p>{{ etape.date | dateFormat }}</p>
        </div>
        <div 
          v-if="etape.duree" 
          class="tablet-blob-1-4"
        >
          <h6>Durée</h6>
          <p>{{ etape.duree }} ans</p>
        </div>
        <div 
          v-if="etape.geojsonMultiPolygon" 
          class="tablet-blob-1-4"
        >
          <h6>Périmètre</h6>
          <p>–</p>
        </div>
        <div 
          v-if="etape.titulaires.length > 0" 
          class="tablet-blob-1-4"
        >
          <h6>Titulaires</h6>
          <p>–</p>
          <p class="hide">{{ etape.titulaires.map(t => t.nom).join(', ') }}</p>
        </div>
        <div 
          v-if="etape.amodiataires.length > 0" 
          class="tablet-blob-1-4"
        >
          <h6>Amodiataires</h6>
          <p>{{ etape.amodiataires.map(t => t.nom).join(', ') }}</p>
        </div>
        <div 
          v-if="etape.substances.length > 0" 
          class="tablet-blob-1-2 large-blob-1-4"
        >
          <h6>Substances</h6>
          <pill-list :elements="etape.substances.map(s=>s.legal.nom)" />
        </div>
      </div>
    </template>
    <documents
      :documents="etape.documents"
    />
  </accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import Documents from '../camino/documents.vue'
import PillList from '../ui/pill-list.vue'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents, PillList
  },

  props: {
    etape: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
