<template>
  <List :documents="documents"></List>

  <DocumentAddButton
    :document="{
      date: new Date().toISOString().slice(0, 10),
      entreprisesLecture: true,
      publicLecture: false,
      fichier: null,
      fichierNouveau: null,
      fichierTypeId: null,
      typeId: ''
    }"
    :mutation="{
      name: 'titreEtapeEdition/documentAdd'
    }"
    parent-id=""
    title="Nouveau document"
    repertoire="demarches"
    class="btn py-s px-m rnd-xs flex-right mt--s mb-s"
    :parent-type-id="etapeTypeId"
  />
</template>

<script>
import DocumentAddButton from '../document/button-add.vue'
import List from '../documents/list.vue'

export default {
  components: { DocumentAddButton, List },

  props: {
    documents: { type: Array, required: true },
    etapeTypeId: { type: String, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {}
  },

  computed: {
    complete() {
      return false
    }
  },

  watch: {
    complete: 'completeUpdate'
  },

  created() {
    this.init()

    this.completeUpdate()
  },

  methods: {
    init() {},

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    }
  }
}
</script>
