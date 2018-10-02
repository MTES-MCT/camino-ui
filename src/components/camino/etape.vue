<template>
  <accordion 
    class="mb" 
    :sub="true"
  >
    <template slot="title">
      <dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">{{ etape.type.nom }}</span>
    </template>

    <template 
      v-if="utilisateur.id" 
      slot="buttons"
    >
      <button
        class="btn-alt py-s px-m"
        :class="[ etape.documents.length ? 'border-t' : 'border-t-r', !etape.documents.length && 'rnd-t-r' ]"
        @click="editPopupOpen"
      >
        <i 
          class="icon-24 icon-24-edit"
        />
      </button>
    </template>

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
          v-if="etape.dateDebut" 
          class="tablet-blob-1-4"
        >
          <h6>Date de début</h6>
          <p>{{ etape.dateDebut | dateFormat }}</p>
        </div>
        <div 
          v-if="etape.dateFin" 
          class="tablet-blob-1-4"
        >
          <h6>Date d'échéance</h6>
          <p>{{ etape.dateFin | dateFormat }}</p>
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
          <p>–</p>
          <p class="hide">{{ etape.amodiataires.map(t => t.nom).join(', ') }}</p>
        </div>
        <div 
          v-if="etape.substances.length > 0" 
          class="tablet-blob-1-2 large-blob-1-4"
        >
          <h6>Substances</h6>
          <pill-list :elements="etape.substances.reduce((res, s) => [...res, ...s.legal.map(l => l.nom)], [])" />
        </div>
      </div>
    </template>
    
    <documents 
      v-if="etape.documents.length > 0"
      :documents="etape.documents"
    />
  </accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from '../camino/documents.vue'
import EtapeEditPopup from './etape-edit-popup.vue'

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
  },

  computed: {
    utilisateur () {
      return this.$store.state.utilisateur
    }
  },

  methods: {
    editPopupOpen () {
      this.$store.dispatch('titre/etapeEdit', { etape: this.etape })
      this.$store.commit('popupOpen', { component: EtapeEditPopup, closeBtn: true })
    },
    editPopupClose () {
      this.$store.commit('popupClose')
    },
  }
}
</script>
