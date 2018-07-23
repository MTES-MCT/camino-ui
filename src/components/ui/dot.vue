<template>
  <span
    :class="color"
    class="pill dot inline-block mr-xs" />
</template>

<script>
export default {
  name: "UiSystemDot",

  props: {
    color: {
      type: String,
      default: 'bg-neutral'
    }
  }
}
</script>
