<template>
  <TypeEdit
    v-model:etape="etape"
    :user="user"
    :etape-types="etapeTypes"
    :etape-type="etapeType"
    :etape-is-demande="etapeIsDemande"
    @type-update="typeUpdate"
    @complete-update="typeCompleteUpdate"
  />

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
import TypeEdit from './type-edit.vue'
import FondamentalesEdit from './fondamentales-edit.vue'
import PointsEdit from './points-edit.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/edit-multi.vue'

export default {
  components: {
    TypeEdit,
    FondamentalesEdit,
    PointsEdit,
    SectionsEdit,
    DocumentsEdit
  },

  props: {
    user: { type: Object, default: null },
    etape: { type: Object, required: true },
    etapeTypes: { type: Array, required: true },
    events: { type: Object, required: true },
    domaineId: { type: String, required: true },
    heritageLoaded: { type: Boolean, required: true },
    etapeIsDemande: { type: Boolean, default: false }
  },

  emits: ['complete-update', 'type-update'],

  data() {
    return {
      documentsComplete: false,
      sectionsComplete: false,
      typeComplete: false
    }
  },

  computed: {
    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    complete() {
      return (
        this.typeComplete &&
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
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete
    },

    typeUpdate(typeId) {
      this.$emit('type-update', typeId)
    }
  }
}
</script>
