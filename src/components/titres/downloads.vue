<template>
  <Dropdown class="full-x">
    <div slot="title">
      <span class="h5">Téléchargements</span>
    </div>
    <div>
      <Download
        v-for="format in formats"
        :key="format"
        :format="format"
        section="titres"
      />
    </div>
  </Dropdown>
</template>

<script>
import Dropdown from '../_ui/dropdown.vue'
import Download from '../_common/download.vue'

export default {
  components: {
    Dropdown,
    Download
  },

  data() {
    return {
      formats: ['geojson', 'csv', 'xls', 'ods']
    }
  }
}
</script>
