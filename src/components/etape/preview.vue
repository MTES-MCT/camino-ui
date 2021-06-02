<template>
  <div>
    <div v-if="hasFondamentales">
      <Fondamentales :etape="etape" />

      <Perimetre
        v-if="etape.points && etape.points.length"
        :points="etape.points"
        :domaine-id="domaineId"
        :titre-type-id="titreTypeId"
        :geojson-multi-polygon="etape.geojsonMultiPolygon"
        :incertitude="!!etape.incertitudes?.points"
      />
      <hr class="mx--" />
    </div>

    <div v-if="hasSections">
      <Section
        v-for="s in etape.type.sections"
        :key="s.id"
        :section="s"
        :contenu="etape.contenu ? etape.contenu[s.id] : {}"
        :date="etape.date"
        @file-download="fileDownload"
      />

      <hr class="mx--" />
    </div>

    <div v-if="etape.documents?.length">
      <h4>Documents</h4>
      <Documents
        :bouton-suppression="etape.modification"
        :bouton-modification="etape.modification"
        :context="documentContext"
        :documents="etape.documents"
        :etiquette="etape.modification"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        repertoire="demarches"
        :title="documentPopupTitle"
      />

      <hr class="mx--" />
    </div>

    <div v-if="etape.justificatifs?.length">
      <h4>Justificatifs</h4>
      <Documents
        :bouton-dissociation="etape.modification"
        :bouton-modification="false"
        :bouton-suppression="false"
        :context="documentContext"
        :documents="etape.justificatifs"
        :etiquette="etape.modification"
        :parent-id="etape.id"
        :parent-type-id="etape.type.id"
        repertoire="'entreprises'"
        :title="documentPopupTitle"
      />

      <hr class="mx--" />
    </div>
  </div>
</template>

<script>
import Fondamentales from './fondamentales.vue'
import Perimetre from './perimetre.vue'
import Section from '../_common/section.vue'
import Documents from '../documents/list.vue'

export default {
  components: {
    Fondamentales,
    Perimetre,
    Documents,
    Section
  },

  props: {
    hasFondamentales: { type: Boolean, required: true },
    hasSections: { type: Boolean, required: true },
    hasDocuments: { type: Boolean, required: true },
    etape: { type: Object, required: true },
    documentContext: { type: Object, required: true },
    documentPopupTitle: { type: String, required: true },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true }
  },

  emits: ['file-download', 'titre-event-track'],

  methods: {
    async fileDownload(fichier) {
      await this.$store.dispatch(
        'download',
        `etape/${this.etape.id}/${fichier}`
      )
    }
  }
}
</script>
