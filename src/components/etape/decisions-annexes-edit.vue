<template>
  <SectionsEdit
    :sections="etape.decisionsAnnexesSections"
    :contenu="etape.decisionsAnnexesContenu"
    @complete-update="$emit('complete-update', $event)"
    @contenu-update="etape.decisionsAnnexesContenu = $event"
  />
</template>

<script>
import SectionsEdit from '../_common/sections-edit.vue'
export default {
  components: { SectionsEdit },

  props: {
    etape: { type: Object, required: true }
  },

  emits: ['complete-update']
}
</script>
