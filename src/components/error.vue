<template>
  <card>
    <div 
      class="mb p-s color-bg"
      :class="`bg-${message.type}`"
    >{{ message.value }}</div>
  </card>
</template>

<script>
import Card from './ui/card.vue'

export default {
  components: {
    Card
  },

  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

