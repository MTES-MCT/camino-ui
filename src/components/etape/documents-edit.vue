<template>
  <List
    :documents="documents"
    :bouton-modification="true"
    :bouton-suppression="true"
    :mutation="{
      name: 'titreEtapeEdition/documentAdd'
    }"
    :manquant-show="true"
    repertoire="demarches"
  />

  <DocumentAddButton
    :document="{
      date: TODAY,
      entreprisesLecture: !userIsAdmin,
      publicLecture: false,
      fichier: null,
      fichierNouveau: null,
      fichierTypeId: null,
      typeId: ''
    }"
    :mutation="{
      name: 'titreEtapeEdition/documentAdd'
    }"
    title="Nouveau document"
    repertoire="demarches"
    class="btn py-s px-m rnd-xs flex-right mt--s mb-s"
    :parent-type-id="etapeTypeId"
  />
</template>

<script>
import DocumentAddButton from '../document/button-add.vue'
import List from '../documents/list.vue'
import { TODAY } from '@/utils'

export default {
  components: { DocumentAddButton, List },

  props: {
    documents: { type: Array, required: true },
    etapeTypeId: { type: String, required: true },
    documentsTypes: { type: Array, required: true },
    userIsAdmin: { type: Boolean, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      TODAY
    }
  },

  computed: {
    complete() {
      return this.documents.every(d => {
        const documentType = this.documentsTypes.find(dt => dt.id === d.typeId)

        return (
          !documentType ||
          documentType.optionnel ||
          !!((d.fichier || d.fichierNouveau) && d.fichierTypeId && d.date)
        )
      })
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  async created() {
    this.completeUpdate()
  },

  methods: {
    documentAdd(documentTypeId) {
      const documentNew = {
        id: documentTypeId,
        typeId: documentTypeId,
        entreprisesLecture: !this.userIsAdmin,
        publicLecture: false,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        date: this.today,
        modification: true,
        suppression: true
      }

      this.documents.push(documentNew)

      if (this.newDocumentTypeId) {
        this.newDocumentTypeId = null
      }
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
