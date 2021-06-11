<template>
  <Documents
    v-if="documents.length"
    :documents="documents"
    :bouton-modification="true"
    :bouton-suppression="true"
    :add-action="{ name: 'titreEtapeEdition/documentAdd' }"
    :remove-action="{ name: 'titreEtapeEdition/documentRemove' }"
    :manquant-show="true"
    repertoire="demarches"
    :title="documentPopupTitle"
    :temporaire="true"
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
    :action="{ name: 'titreEtapeEdition/documentAdd' }"
    :title="documentPopupTitle"
    repertoire="demarches"
    class="btn py-s px-m rnd-xs mt--s mb-s full-x"
    :parent-type-id="etapeTypeId"
    :temporaire="true"
    :large="true"
  />
</template>

<script>
import DocumentAddButton from '../document/button-add.vue'
import Documents from '../documents/list.vue'
import { TODAY } from '@/utils'

export default {
  components: { DocumentAddButton, Documents },

  props: {
    documents: { type: Array, required: true },
    etapeTypeId: { type: String, required: true },
    documentsTypes: { type: Array, required: true },
    userIsAdmin: { type: Boolean, required: true },
    documentPopupTitle: { type: String, required: true }
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
    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
