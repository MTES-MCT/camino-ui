<template>
  <accordion 
    class="mb" 
    :sub="true"
  >
    <template slot="title">{{ etape.type.nom }}</template>
    <template slot="sub">
      <h6>Date</h6>
      <h4>{{ etape.date | dateFormat }}</h4>
    </template>
    <documents
      :documents="etape.documents"
    />
  </accordion>
</template>

<script>
import Accordion from '../ui/accordion.vue'
import Documents from '../camino/documents.vue'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Accordion,
    Documents
  },

  props: {
    etape: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
