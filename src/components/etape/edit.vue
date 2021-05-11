<template>
  <div v-if="etapesStatuts" class="tablet-blobs">
    <div class="tablet-blob-1-3 tablet-pt-s pb-s">
      <h5>Statut</h5>
    </div>
    <div class="mb tablet-blob-2-3">
      <select v-model="etape.statutId" class="p-s">
        <option
          v-for="etapeStatut in etapesStatuts"
          :key="etapeStatut.id"
          :value="etapeStatut.id"
          :disabled="etape.statutId === etapeStatut.id"
        >
          {{ etapeStatut.nom }}
        </option>
      </select>
    </div>
  </div>
  <hr />

  <EtapeEditFondamentales
    v-if="etapeType && etapeType.fondamentale"
    v-model:etape="etape"
    :domaine-id="domaineId"
  />

  <EtapeEditPoints
    v-if="etapeType && etapeType.fondamentale"
    v-model:etape="etape"
    v-model:events="events"
  />

  <EditSections
    v-if="etape.sections"
    v-model:etape="etape"
    :sections="etape.sections"
    @complete-update="sectionsCompleteUpdate"
  />

  <DocumentsEdit
    v-if="etapeType.documentsTypes"
    v-model:documents="etape.documents"
    :parent-id="etape.id"
    :parent-type-id="etapeType.id"
    :documents-types="etapeType.documentsTypes"
    repertoire="demarches"
    @complete-update="documentsCompleteUpdate"
  />
</template>

<script>
import EtapeEditFondamentales from './edit-fondamentales.vue'
import EtapeEditPoints from './edit-points.vue'
import EditSections from './edit-sections.vue'
import DocumentsEdit from '../document/edit-multi.vue'

export default {
  components: {
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    DocumentsEdit
  },

  props: {
    etape: { type: Object, required: true },
    etapeTypes: { type: Array, required: true },
    events: { type: Object, required: true },
    domaineId: { type: String, default: '' }
  },

  emits: ['edit-complete-update'],

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

    etapesStatuts() {
      return this.etapeType && this.etapeType.etapesStatuts
    },

    dateIsVisible() {
      return !this.etapeId && !this.etape
    },

    documentsTypes() {
      return (
        this.etapeType &&
        this.etapeType.documentsTypes.filter(dt => !dt.optionnel)
      )
    },

    complete() {
      return (
        this.etape.typeId &&
        this.etape.statutId &&
        (this.etape.statutId === 'aco' ||
          ((!this.documentsTypes?.length || this.documentsComplete) &&
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
    }
  }
}
</script>
