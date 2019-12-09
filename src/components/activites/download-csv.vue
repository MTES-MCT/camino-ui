<template>
  <Download
    :type="'csv'"
    :content="content"
    :name="name"
  />
</template>

<script>
import { parse } from 'json2csv'
import Download from '../_ui/download.vue'
import activitesFormatCsv from './download-csv'

export default {
  components: {
    Download
  },

  props: {
    activites: {
      type: Array,
      default: () => []
    },

    activiteTypeSections: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    name() {
      return this.fileNameCreate('activites', 'csv')
    },

    activitesTypes() {
      return this.$store.state.metas.activites.activitesTypes
    },

    content() {
      return parse(
        activitesFormatCsv(this.activites, this.activiteTypeSections),
        {}
      )
    }
  }
}
</script>
