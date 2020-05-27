<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>Document</th>
        <th class="full-x-">
          Description
        </th>
        <th />
      </tr>
      <DocumentTr
        v-for="document in documents"
        :key="document.id"
        :document="document"
        :titre-nom="titreNom"
        :demarche-type-nom="demarcheTypeNom"
        :etape-type-nom="etapeTypeNom"
        :etape-id="etapeId"
      />
    </table>
  </div>
</template>

<script>
import DocumentTr from './document/tr.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: { type: Array, default: () => [] },
    etapeId: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    demarcheTypeNom: { type: String, default: '' },
    etapeTypeNom: { type: String, default: '' }
  }
}
</script>
