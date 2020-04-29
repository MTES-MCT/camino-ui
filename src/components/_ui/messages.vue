<template>
  <TransitionGroup
    name="slide-bottom"
    class="list-sans mb-0"
    tag="ul"
  >
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="mb p-s color-bg"
      :class="`bg-${message.type}`"
    >
      <span class="cap-first">
        {{ message.value }}
      </span>
    </li>
  </TransitionGroup>
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
