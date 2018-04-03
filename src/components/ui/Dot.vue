<template>
  <span
    :class="`bg-${color}`"
    class="pill dot inline-block mr-xs" />
</template>

<script>
export default {
  name: "UiSystemDot",

  props: {
    color: {
      type: String,
      default: 'neutral'
    }
  }
}
</script>
