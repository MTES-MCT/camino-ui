<template>
  <div class="px pt-m">
    <div v-if="dateIsVisible && etape.date">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h5>
            Date
            <Tag
              v-if="etape.incertitudes && etape.incertitudes.date"
              :mini="true"
              color="bg-info"
              class="ml-xs"
            >
              Incertain
            </Tag>
          </h5>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            {{ dateFormat(etape.date) }}
          </p>
        </div>
      </div>
      <hr class="mx--" />
    </div>

    <div v-if="hasFondamentales">
      <Fondamentales :etape="etape" />

      <Perimetre
        v-if="etape.points && etape.points.length"
        :points="etape.points"
        :domaine-id="domaineId"
        :titre-type-id="titreTypeType.id"
        :geojson-multi-polygon="etape.geojsonMultiPolygon"
        :incertitude="!!etape.incertitudes?.points"
      />
      <hr class="mx--" />
    </div>

    <div v-if="etape.type.sections?.length">
      <Section
        v-for="s in etape.type.sections"
        :key="s.id"
        :section="s"
        :contenu="etape.contenu ? etape.contenu[s.id] : {}"
        :date="etape.date"
      />

      <hr class="mx--" />
    </div>

    <div v-if="etape.documents?.length">
      <h4>Documents</h4>
      <Documents
        :bouton-suppression="false"
        :bouton-modification="false"
        :documents="etape.documents"
        :etiquette="etape.modification"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        repertoire="demarches"
      />

      <hr class="mx--" />
    </div>

    <div v-if="etape.justificatifs?.length">
      <h4>Justificatifs</h4>
      <Documents
        :bouton-dissociation="false"
        :bouton-modification="false"
        :bouton-suppression="false"
        :documents="etape.justificatifs"
        :etiquette="etape.modification"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        repertoire="'entreprises'"
      />

      <hr class="mx--" />
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
import Tag from '../_ui/tag.vue'
import Perimetre from './perimetre.vue'
import Fondamentales from './fondamentales.vue'
import Section from '../_common/section.vue'
import Documents from '../documents/list.vue'

export default {
  components: {
    Tag,
    Perimetre,
    Fondamentales,
    Section,
    Documents
  },

  props: {
    etape: { type: Object, required: true },
    titreTypeType: { type: Object, required: true },
    domaineId: { type: String, required: true },
    dateIsVisible: { type: Boolean, default: false }
  },

  computed: {
    hasFondamentales() {
      return (
        !!this.etape.duree ||
        !!this.etape.surface ||
        !!this.etape.dateDebut ||
        !!this.etape.dateFin ||
        !!(this.etape.points && this.etape.points.length) ||
        !!(this.etape.substances && this.etape.substances.length) ||
        !!(this.etape.titulaires && this.etape.titulaires.length) ||
        !!(this.etape.amodiataires && this.etape.amodiataires.length)
      )
    }
  },

  methods: {
    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
