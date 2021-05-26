<template>
  <Accordion
    class="mb-s"
    :slot-default="true"
    :opened="opened"
    @toggle="toggle"
  >
    <template #title>
      <span class="cap-first">{{ step.name }}</span>
      <Tag v-if="!complete" :mini="true" color="bg-warning" class="ml-s"
        >Incomplet</Tag
      >
    </template>

    <div class="px pt">
      <div><slot /></div>
      <div v-if="step.hasNextButton">
        <button
          class="btn-flash p-s rnd-xs full-x mb"
          :disabled="!complete && !enConstruction"
          :class="{ disabled: !complete && !enConstruction }"
          @click="next"
        >
          Suivant
        </button>
      </div>
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

  emits: ['toggle', 'next'],

  methods: {
    toggle() {
      this.$emit('toggle')
    },

    next() {
      this.$emit('next')
    }
  }
}
</script>
