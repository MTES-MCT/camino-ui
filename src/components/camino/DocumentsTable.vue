<template>
  <div :class="{ 'height-0': !opened}">
    <table>
      <tr>
        <th />
        <th>Organisme</th>
        <th>Acte</th>
        <th>Nom</th>
        <th>Date</th>
        <th />
      </tr>
      <documents-table-tr
        v-for="document in documents"
        :key="document.id"
        :document="document" />
    </table>
  </div>
</template>

<script>
import DocumentsTableTr from '@components/camino/DocumentsTableTr.vue'

export default {
  components: {
    DocumentsTableTr
  },

  props: {
    documents: {
      type: Array,
      default: () => []
    },
    opened: {
      type: Boolean,
      default: false
    }
  }
}
</script>
