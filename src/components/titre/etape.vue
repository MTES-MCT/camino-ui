<template>
  <Accordion
    class="mb"
    :sub="true"
  >
    <template slot="title">
      <Dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">
        {{ etape.type.nom }}
      </span>
    </template>

    <template
      v-if="permissionsCheck(['super', 'admin'])"
      slot="buttons"
    >
      <button
        class="btn-alt py-s px-m"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-24-pencil" />
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
          <p class="hide">
            {{ etape.titulaires.map(t => t.nom).join(", ") }}
          </p>
        </div>
        <div
          v-if="etape.amodiataires.length > 0"
          class="tablet-blob-1-4"
        >
          <h6>Amodiataires</h6>
          <p>–</p>
          <p class="hide">
            {{ etape.amodiataires.map(t => t.nom).join(", ") }}
          </p>
        </div>
        <div
          v-if="etape.substances.length > 0"
          class="tablet-blob-1-2 large-blob-1-4"
        >
          <h6>Substances</h6>
          <PillList :elements="etape.substances.map(s => s.nom)" />
        </div>
      </div>
    </template>

    <Documents
      v-if="etape.documents.length > 0"
      :documents="etape.documents"
    />
  </Accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from './documents.vue'
import EditPopup from './etape-edit-popup.vue'
import { dateFormat } from '../../utils'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents,
    PillList
  },

  props: {
    etape: {
      type: Object,
      default: () => {}
    },
    demarcheId: {
      type: String,
      default: ''
    }
  },

  methods: {
    editPopupOpen() {
      const etapeCloneAndFormat = etape => {
        const etapeTmp = JSON.parse(JSON.stringify(etape))
        if (etapeTmp.date) {
          etapeTmp.date = dateFormat(etapeTmp.date)
        }
        if (etapeTmp.dateDebut) {
          etapeTmp.dateDebut = dateFormat(etapeTmp.dateDebut)
        }
        if (etapeTmp.dateFin) {
          etapeTmp.dateFin = dateFormat(etapeTmp.dateFin)
        }

        delete etapeTmp.geojsonPoints
        delete etapeTmp.geojsonMultiPolygon
        delete etapeTmp.documents

        return etapeTmp
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape: etapeCloneAndFormat(this.etape)
        }
      })
    },
    editPopupClose() {
      this.$store.commit('popupClose')
    }
  }
}
</script>
