<template>
  <Download
    name="activites"
    type="csv"
    :content-build="contentBuild"
  />
</template>

<script>
import { parse } from 'json2csv'
import Download from '../_common/download.vue'
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
    activitesTypes() {
      return this.$store.state.titresActivites.metas.activitesTypes
    }
  },

  methods: {
    contentBuild() {
      return parse(
        activitesFormatCsv(this.activites, this.activiteTypeSections),
        {}
      )
    }
  }
}
</script>
