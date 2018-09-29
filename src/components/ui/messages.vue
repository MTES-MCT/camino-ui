<template>
  <ul 
    v-if="messages.length > 0" 
    class="list-sans mb-0"
  >
    <li 
      v-for="(message, index) in messages" 
      :key="index" 
      class="mb p-s color-bg"
      :class="`bg-${message.type}`"
    >{{ message.value }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
}
</script>

