<template>
  <Accordion class="mb" :opened="opened" @close="close" @toggle="toggle">
    <template #title> Colonnes </template>
    <ul class="list-sans px-m">
      <li v-for="column in columns" :key="column.type">
        <label>
          <input type="checkbox" class="mr-s" /> {{ column.name }}
        </label>
      </li>
    </ul>
  </Accordion>
</template>

<script>
import Accordion from './accordion.vue'

export default {
  components: {
    Accordion
  },

  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    toggle() {
      this.opened = !this.opened
    }
  }
}
</script>
