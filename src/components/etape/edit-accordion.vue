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

    <div class="p">
      <div><slot /></div>
      <div v-if="hasNextButton">
        <button class="btn-flash p-s rnd-xs full-x" @click="next">
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
    stepId: { type: Number, required: true },
    opened: { type: Object, required: true },
    hasNextButton: { type: Boolean, default: () => true },
    title: { type: String, required: true }
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
