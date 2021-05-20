<template>
  <EtapeEditType
    v-model:etape="etape"
    :etape-types="etapeTypes"
    :etape-type="etapeType"
    :restricted="restricted"
    :etape-is-demande="etapeIsDemande"
    @type-update="typeUpdate"
  />

  <EtapeEditFondamentales
    v-if="heritageLoaded && etapeType && etapeType.fondamentale"
    v-model:etape="etape"
    :domaine-id="domaineId"
  />

  <EtapeEditPoints
    v-if="etapeType && etapeType.fondamentale"
    v-model:etape="etape"
    v-model:events="events"
  />

  <EditSections
    v-if="heritageLoaded && etape.sections"
    v-model:etape="etape"
    :sections="etape.sections"
    @complete-update="sectionsCompleteUpdate"
  />

  <DocumentsEdit
    v-if="
      heritageLoaded &&
      etapeType.documentsTypes &&
      etapeType.documentsTypes.length
    "
    v-model:documents="etape.documents"
    :parent-id="etape.id"
    :parent-type-id="etapeType.id"
    :documents-types="etapeType.documentsTypes"
    repertoire="demarches"
    @complete-update="documentsCompleteUpdate"
  />
</template>

<script>
import EtapeEditType from './edit-type.vue'
import EtapeEditFondamentales from './edit-fondamentales.vue'
import EtapeEditPoints from './edit-points.vue'
import EditSections from './edit-sections.vue'
import DocumentsEdit from '../document/edit-multi.vue'

export default {
  components: {
    EtapeEditType,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    DocumentsEdit
  },

  props: {
    etape: { type: Object, required: true },
    etapeTypes: { type: Array, required: true },
    events: { type: Object, required: true },
    domaineId: { type: String, required: true },
    heritageLoaded: { type: Boolean, required: true },
    restricted: { type: Boolean, default: true },
    etapeIsDemande: { type: Boolean, default: false }
  },

  emits: ['edit-complete-update', 'type-update'],

  data() {
    return {
      documentsComplete: false,
      sectionsComplete: false
    }
  },

  computed: {
    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    complete() {
      return (
        this.etape.typeId &&
        this.etape.statutId &&
        (this.etape.statutId === 'aco' ||
          ((!this.etapeType.documentsTypes?.length || this.documentsComplete) &&
            this.sectionsComplete))
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
      this.$emit('edit-complete-update', this.complete)
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    typeUpdate(typeId) {
      this.$emit('type-update', typeId)
    }
  }
}
</script>
