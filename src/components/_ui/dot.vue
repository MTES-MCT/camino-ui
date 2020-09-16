<template>
  <span :class="color" class="pill dot mr-xs" />
</template>

<script>
export default {
  name: 'UiSystemDot',

  props: {
    color: {
      type: String,
      default: 'bg-neutral'
    }
  }
}
</script>
