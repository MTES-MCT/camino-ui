<template>
  <div class="mb">
    <h5>{{ filter.name }}</h5>
    <hr class="mb-s" />

    <InputAutocomplete
      v-if="options?.length"
      :selected="values"
      :options="options"
      value-prop="id"
      label-prop="nom"
      class="p-s"
      @opened="$emit('opened', $event)"
      @update:selected="updateHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputAutocomplete from './input-autocomplete.vue'

export default defineComponent({
  components: { InputAutocomplete },

  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['opened'],

  computed: {
    values() {
      return this.filter.value
    },
    options() {
      return this.filter.elements
    }
  },

  methods: {
    updateHandler(e) {
      this.filter.value = e
    }
  }
})
</script>
