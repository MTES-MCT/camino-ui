<template>
  
  <card>
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      class="mb p-s bg-error color-bg"
    >{{ message }}</div>
  </card>
</template>

<script>
import Card from './card.vue'
export default {
  components: {
    Card
  },

  props: {
    messages: {
      type: Array,
      default: () => ['Erreur']
    }
  }
}
</script>

