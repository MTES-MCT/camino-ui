<template>
  <Card>
    <div
      class="mb p-s color-bg"
      :class="`bg-${message.type}`"
    >
      {{ message.value }}
    </div>
  </Card>
</template>

<script>
import Card from './_ui/card.vue'

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
