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
      :supprimable="supprimable(document.typeId)"
      @remove="documentRemove(n)"
    />

    <div v-if="modifiable && ajoutable">
      <h4 class="mb-s">Nouveau document</h4>
      <div class="blobs-mini">
        <div class="blob-mini-1-2">
          <select v-model="newDocumentTypeId" class="p-s mb-s rnd-xs">
            <option v-for="dt in documentsTypes" :key="dt.id" :value="dt.id">
              {{ dt.nom }}
            </option>
          </select>
        </div>

        <div class="blob-mini-1-2">
          <button
            class="btn small py-s px-m mb-s full-x rnd-xs flex"
            :class="{ disabled: !newDocumentTypeId }"
            :disabled="!newDocumentTypeId"
            @click="documentAdd(newDocumentTypeId)"
          >
            <span class="mt-xxs">Ajouter un document</span>
            <i class="icon-24 icon-plus flex-right" />
          </button>
        </div>
      </div>

      <hr />
    </div>
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
    },

    documentRemove(index) {
      this.documents.splice(index, 1)
    },

    supprimable(typeId) {
      const documentType = this.documentsTypes.find(dt => dt.id === typeId)

      if (documentType.optionnel) {
        return true
      }

      const documentsWithSameType = this.documents.filter(
        d => d.typeId === typeId
      )

      if (documentsWithSameType.length > 1) {
        return true
      }

      return false
    }
  }
}
</script>
