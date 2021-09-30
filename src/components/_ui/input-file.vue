<template>
  <label v-bind="$attrs">
    Choisir un fichier…
    <input
      type="file"
      class="p-xs mb-0"
      :accept="accept"
      @change="$emit('change', $event)"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    accept: {
      type: String,
      default: ''
    }
  },

  emits: ['change']
})
</script>
