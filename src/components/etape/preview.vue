<template>
  <div>
    <div v-if="hasFondamentales">
      <Fondamentales :etape="etape" />
      <Points :etape="etape" />
      <hr :class="{ 'mx--': framed }" />
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

      <hr :class="{ 'mx--': framed }" />
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

      <hr :class="{ 'mx--': framed }" />
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

      <hr :class="{ 'mx--': framed }" />
    </div>
  </div>
</template>

<script>
import Fondamentales from './fondamentales.vue'
import Points from './points.vue'
import Section from '../_common/section.vue'
import Documents from '../documents/list.vue'

export default {
  components: {
    Fondamentales,
    Points,
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
    framed: { type: Boolean, default: false }
  },

  emits: ['file-download', 'titre-event-track'],

  methods: {
    async fileDownload(fichier) {
      await this.$store.dispatch(
        'download',
        `etape/${this.etape.id}/${fichier}`
      )
    },

    eventTrack() {
      this.$emit('titre-event-track')
    }
  }
}
</script>
