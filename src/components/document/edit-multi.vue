<template>
  <div v-if="visible">
    <h3>Documents</h3>
    <Edit
      v-for="(document, n) in documents"
      :key="document.id"
      v-model:document="documents[n]"
      :document-type="documentsTypes.find(dt => dt.id === document.typeId)"
      :modifiable="modifiable"
      :repertoire="repertoire"
    />
  </div>
</template>

<script>
import Edit from './edit-multi-document.vue'

export default {
  name: 'CaminoDocumentEditMulti',

  components: {
    Edit
  },

  props: {
    documents: { type: Array, required: true },
    modifiable: { type: Boolean, default: true },
    repertoire: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    parentId: { type: String, default: undefined, required: false },
    documentsTypes: { type: Array, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      loaded: false
    }
  },

  computed: {
    complete() {
      return this.documents.every(d => {
        const optionnel = this.documentsTypes.find(
          dt => dt.id === d.typeId
        ).optionnel

        return (
          optionnel ||
          !!((d.fichier || d.fichierNouveau) && d.fichierTypeId && d.date)
        )
      })
    },

    visible() {
      return (
        this.loaded &&
        (this.modifiable ||
          this.documentsTypes.some(dt => !dt.optionnel) ||
          this.documents.some(d => d.fichier || d.fichierNouveau))
      )
    }
  },

  watch: {
    complete: {
      handler: function (complete) {
        this.$emit('complete-update', complete)
      },
      immediate: true
    }
  },

  async created() {
    await this.get()

    this.$emit('complete-update', this.complete)
  },

  methods: {
    async get() {
      const options = { repertoire: this.repertoire }
      if (this.parentTypeId) {
        options.typeId = this.parentTypeId
      }

      await this.$store.dispatch('document/init', options)

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
