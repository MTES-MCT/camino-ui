<template>
  <div v-if="journal.operation === 'create'">
    {{ journal.elementId }}
  </div>
  <div v-else class="differences overflow-scroll-y">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="differencesHtml"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatters } from 'jsondiffpatch'
import 'jsondiffpatch/dist/formatters-styles/html.css'

export default defineComponent({
  props: {
    journal: { type: Object, required: true }
  },

  computed: {
    differencesHtml() {
      if (this.journal.differences) {
        let html = formatters.html.format(this.journal.differences)
        html = html.replaceAll('jsondiffpatch-child-node-type-object', '')
        return html
      }

      return ''
    }
  }
})
</script>
<style>
.differences {
  max-height: 200px;
}
</style>
