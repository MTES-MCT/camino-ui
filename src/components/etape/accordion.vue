<template>
  <Accordion
    class="mb-s"
    :opened="opened"
    :slot-default="true"
    @toggle="toggle"
  >
    <template #title>
      <div class="flex flex-center">
        <h2 class="cap-first mb-0">{{ step.name }}</h2>
        <Tag
          v-if="!complete"
          :mini="true"
          color="bg-warning"
          class="ml-s mt-xs"
        >
          Incomplet
        </Tag>
      </div>
    </template>

    <div class="px pt">
      <div><slot /></div>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '../_ui/accordion.vue'

import Tag from '../_ui/tag.vue'

export default {
  components: { Accordion, Tag },
  props: {
    step: { type: Object, required: true },
    opened: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
    enConstruction: { type: Boolean, required: true }
  },

  emits: ['toggle'],

  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
