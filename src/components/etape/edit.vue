<template>
  <EtapeEditType
    v-model:etape="etape"
    :etape-types="etapeTypes"
    :etape-type="etapeType"
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
    v-if="heritageLoaded && documentsTypes && documentsTypes.length"
    v-model:documents="documents"
    :parent-id="etape.id"
    :parent-type-id="etapeType.id"
    :documents-types="documentsTypes"
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
    heritageLoaded: { type: Boolean, required: true }
  },

  emits: ['edit-complete-update', 'type-update'],

  data() {
    return {
      documentsComplete: false,
      sectionsComplete: false,
      documents: []
    }
  },

  computed: {
    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
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
    complete: 'completeUpdate',

    documents: {
      handler: function () {
        // on a besoin d'une usine à gaz
        // pour conserver les documents optionnels et obligatoires
        // on enlève les documents sans id
        this.etape.documents = this.etape.documents.filter(d => d.id)

        // on met à jour les documents qui ont un id
        this.etape.documents = this.etape.documents.map(d => {
          const document = this.documents.find(ed => ed.id === d.id)

          return document || d
        })

        // on met à jour les documents sans id
        this.etape.documents = this.etape.documents.concat(
          this.documents.filter(d => !d.id)
        )
      },
      deep: true
    }
  },

  created() {
    this.documents = this.etape.documents.filter(d =>
      this.documentsTypes.find(dt => dt.id === d.typeId)
    )

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
