<template>
  <div
    class="mb p-s color-bg"
    :class="`bg-${message.type}`"
  >
    {{ message.value }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
