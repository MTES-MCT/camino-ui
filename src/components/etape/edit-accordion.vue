<template>
  <Accordion
    :id="'step' + stepId"
    class="mb-s"
    :slot-default="true"
    :opened="opened[stepId]"
    @toggle="toggle"
  >
    <template #title>
      <span class="cap-first"> {{ title }} </span>
    </template>
    <div class="px pt">
      <div><slot /></div>
      <div v-if="hasNextButton">
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
    stepId: { type: String, required: true },
    opened: { type: Object, required: true },
    hasNextButton: { type: Boolean, default: () => true },
    title: { type: String, required: true },
    complete: { type: Boolean, required: true }
  },

  emits: ['toggle', 'next'],

  methods: {
    toggle() {
      this.$emit('toggle', this.stepId)
    },

    next() {
      this.$emit('next', this.stepId)
    }
  }
}
</script>
