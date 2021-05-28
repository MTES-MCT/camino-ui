<template>
  <Accordion
    class="mb-s"
    :slot-default="true"
    :opened="opened || !modifiable"
    @toggle="toggle"
  >
    <template #title>
      <div class="flex flex-center">
        <h2 class="cap-first mb-0">{{ step.name }}</h2>
        <Tag v-if="!complete" :mini="true" color="bg-warning" class="ml-s mt-xs"
          >Incomplet</Tag
        >
      </div>
    </template>

    <div class="px pt">
      <div v-if="modifiable">
        <div><slot name="write" /></div>
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
      <slot v-else name="read" />
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
    modifiable: { type: Boolean, default: true },
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
