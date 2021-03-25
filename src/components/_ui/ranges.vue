<template>
  <Accordion
    class="mb"
    :opened="opened"
    :slot-default="true"
    @close="close"
    @toggle="toggle"
  >
    <template #title> Éléments </template>
    <ul class="list-sans mt-m px-m">
      <li v-for="r in ranges" :key="r">
        <label>
          <input
            :checked="r === range"
            :value="r"
            type="radio"
            class="mr-s"
            @change="rangeUpdate"
          />
          {{ r }}
        </label>
      </li>
    </ul>
  </Accordion>
</template>

<script>
import Accordion from './accordion.vue'

export default {
  name: 'UiPagination',

  components: {
    Accordion
  },

  props: {
    ranges: { type: Array, default: () => [] },
    range: { type: Number, default: 200 }
  },

  emits: ['range-update'],

  data() {
    return {
      opened: false
    }
  },

  methods: {
    rangeUpdate(event) {
      this.$emit('range-update', Number(event.target.value))
    },

    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    }
  }
}
</script>
