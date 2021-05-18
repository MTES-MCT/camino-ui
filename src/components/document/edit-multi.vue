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

    <div v-if="modifiable && ajoutable">
      <h4>Nouveau document</h4>
      <select v-model="newDocumentTypeId" class="p-s mb-s rnd-xs">
        <option v-for="dt in documentsTypes" :key="dt.id" :value="dt.id">
          {{ dt.nom }}
        </option>
      </select>

      <button
        v-if="newDocumentTypeId"
        class="btn p-s mb-s full-x rnd-xs"
        @click="documentAdd(newDocumentTypeId)"
      >
        Ajouter un document
      </button>
    </div>

    <hr />
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
    ajoutable: { type: Boolean, default: true },
    repertoire: { type: String, required: true },
    parentId: { type: String, required: true },
    documentsTypes: { type: Array, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      newDocumentTypeId: null
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
        this.modifiable ||
        this.documentsTypes.some(dt => !dt.optionnel) ||
        this.documents.some(d => d.fichier || d.fichierNouveau)
      )
    }
  },

  watch: {
    complete: {
      handler: function (complete) {
        this.$emit('complete-update', complete)
      },
      immediate: true
    },

    documentsTypes: {
      handler: 'init',
      deep: true
    }
  },

  async created() {
    await this.init()

    this.$emit('complete-update', this.complete)
  },

  methods: {
    async init() {
      // supprime les documents dont le documenTType n'existe pas
      this.documents.forEach(d => {
        const documentsTypesIds = this.documentsTypes.map(({ id }) => id)
        if (!documentsTypesIds.includes(d.typeId)) {
          const index = this.documents.findIndex(({ id }) => id === d.id)

          if (index > -1) {
            this.documents.splice(index, 1)
          }
        }
      })

      // crée les documents dont le type est obligatoires si ils n'existent pas
      this.documentsTypes.forEach(dt => {
        if (
          !dt.optionnel &&
          !this.documents.find(({ typeId }) => typeId === dt.id)
        ) {
          this.documentAdd(dt.id)
        }
      })
    },

    documentAdd(documentTypeId) {
      const documentNew = {
        typeId: documentTypeId,
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

      if (this.newDocumentTypeId) {
        this.newDocumentTypeId = null
      }
    }
  }
}
</script>
