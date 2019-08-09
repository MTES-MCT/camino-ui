<template>
  <div>
    <Accordion class="mb">
      <template slot="title">
        Colonnes
      </template>
      <ul class="list-sans px-m">
        <li
          v-for="column in columns"
          :key="column.type"
        >
          <label>
            <input
              type="checkbox"
              class="mr-s"
            > {{ column.name }}
          </label>
        </li>
      </ul>
    </Accordion>
  </div>
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
  }
}
</script>

