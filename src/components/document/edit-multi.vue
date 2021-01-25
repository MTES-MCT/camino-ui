<template>
  <div v-if="loaded">
    <h3>Documents</h3>
    <div v-for="document in documents" :key="document.id">
      <h4>{{ documentsTypes.find(dt => dt.id === document.typeId).nom }}</h4>

      <hr />

      <EditSections
        :document.sync="document"
        :modifiable="modifiable"
        :repertoire="repertoire"
      />
    </div>
  </div>
</template>

<script>
import EditSections from './edit-sections.vue'

export default {
  name: 'CaminoDocumentEditMulti',

  components: {
    EditSections
  },

  props: {
    documents: { type: Array, required: true },
    modifiable: { type: Boolean, default: true },
    repertoire: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    parentId: { type: String, required: true }
  },
  data() {
    return {
      loaded: false
    }
  },

  computed: {
    documentsTypes() {
      return this.$store.state.document.metas.documentsTypes
    },

    complete() {
      return this.documents.reduce(
        (c, d) =>
          c &&
          !!(
            d.optionnel ||
            ((d.fichier || d.fichierNouveau) && d.fichierTypeId && d.date)
          ),
        true
      )
    }
  },

  watch: {
    complete: {
      handler: function(complete) {
        this.$emit('complete-update', complete)
      },
      immediate: true
    }
  },

  async created() {
    await this.get()
  },

  methods: {
    async get() {
      const options = { repertoire: this.repertoire }
      if (this.parentTypeId) {
        options.typeId = this.parentTypeId
      }

      await this.$store.dispatch('document/metasGet', options)

      this.documentsTypes.forEach(dt => {
        if (!this.documents.find(d => d.typeId === dt.id)) {
          const documentNew = {
            typeId: dt.id,
            entreprisesLecture: false,
            publicLecture: false,
            fichier: null,
            fichierNouveau: null,
            fichierTypeId: null,
            date: ''
          }

          if (this.repertoire === 'demarches') {
            documentNew.titreEtapeId = this.parentId
          } else if (this.repertoire === 'activites') {
            documentNew.titreActiviteId = this.parentId
          } else if (this.repertoire === 'entreprises') {
            documentNew.titreEntrepriseId = this.parentId
          } else if (this.repertoire === 'travaux') {
            documentNew.titreTravauxEtapeId = this.parentId
          }

          this.documents.push(documentNew)
        }
      })

      this.loaded = true
    }
  }
}
</script>
