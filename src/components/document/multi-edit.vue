<template>
  <Documents
    v-if="documents.length"
    :documents="documents"
    :bouton-modification="true"
    :bouton-suppression="true"
    :add-action="addAction"
    :remove-action="removeAction"
    :manquant-show="true"
    :repertoire="repertoire"
    :title="documentPopupTitle"
  />

  <DocumentAddButton
    v-if="documentsTypes?.length"
    :document="{
      date: TODAY,
      entreprisesLecture: !userIsAdmin,
      publicLecture: false,
      fichier: null,
      fichierNouveau: null,
      fichierTypeId: null,
      typeId: ''
    }"
    :action="addAction"
    :title="documentPopupTitle"
    :repertoire="repertoire"
    class="btn py-s px-m rnd-xs mt--s mb-s full-x"
    :parent-type-id="parentTypeId"
    :large="true"
    :documents-types="documentsTypes"
  />
</template>

<script>
import DocumentAddButton from './button-add.vue'
import Documents from '../documents/list.vue'
import { TODAY } from '@/utils'

export default {
  components: { DocumentAddButton, Documents },

  props: {
    documents: { type: Array, required: true },
    parentTypeId: { type: String, required: true },
    documentsTypes: { type: Array, required: true },
    documentPopupTitle: { type: String, required: true },
    addAction: { type: Object, default: null },
    removeAction: { type: Object, default: null },
    repertoire: { type: String, required: true }
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
          !!(
            (d.fichier ||
              d.fichierNouveau ||
              (this.userIsAdmin && (d.uri || d.url))) &&
            d.date
          )
        )
      })
    },

    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
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
