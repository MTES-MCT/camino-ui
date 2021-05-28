<template>
  <FondamentalesEdit
    v-if="heritageLoaded && etapeType && etapeType.fondamentale"
    v-model:etape="etape"
    :domaine-id="domaineId"
  />

  <PointsEdit
    v-if="etapeType?.fondamentale"
    v-model:etape="etape"
    v-model:events="events"
  />

  <SectionsEdit
    v-if="heritageLoaded && etape.sections"
    v-model:etape="etape"
    :sections="etape.sections"
    @complete-update="sectionsCompleteUpdate"
  />

  <DocumentsEdit
    v-if="heritageLoaded && etapeType?.documentsTypes.length"
    v-model:documents="etape.documents"
    :parent-id="etape.id"
    :parent-type-id="etapeType.id"
    :documents-types="etapeType.documentsTypes"
    repertoire="demarches"
    @complete-update="documentsCompleteUpdate"
  />
</template>

<script>
import FondamentalesEdit from './fondamentales-edit.vue'
import PointsEdit from './points-edit.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/multi-edit.vue'

export default {
  components: {
    FondamentalesEdit,
    PointsEdit,
    SectionsEdit,
    DocumentsEdit
  },

  props: {
    etape: { type: Object, required: true },
    etapeType: { type: Object, required: true },
    events: { type: Object, required: true },
    domaineId: { type: String, required: true },
    heritageLoaded: { type: Boolean, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      documentsComplete: false,
      sectionsComplete: false
    }
  },

  computed: {
    complete() {
      return (
        (!this.etapeType.documentsTypes?.length || this.documentsComplete) &&
        (!this.etape.sections.length || this.sectionsComplete)
      )
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  created() {
    this.completeUpdate()
  },

  methods: {
    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    }
  }
}
</script>
