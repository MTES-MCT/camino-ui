<template>
  <Accordion
    class="mb-s"
    :slot-default="true"
    :opened="opened"
    @toggle="toggle"
  >
    <template #title>
      <span class="cap-first"> {{ step.name }} </span>
    </template>
    <div class="px pt">
      <div><slot /></div>
      <div v-if="step.hasNextButton">
        <button
          class="btn-flash p-s rnd-xs full-x mb"
          :disabled="!complete"
          :class="{ disabled: !complete }"
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

export default {
  components: { Accordion },
  props: {
    step: { type: Object, required: true },
    opened: { type: Boolean, required: true },
    complete: { type: Boolean, required: true }
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
