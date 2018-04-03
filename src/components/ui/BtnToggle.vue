<template>
  <button class="btn p-s">
    <i class="icon-24 icon-24-chevron-b" />
  </button>
</template>

<script>
export default {
  name: "UiSystemBtnToggle",

  props: {
    opened: {
      type: Boolean,
      default: false
    }
  }
}
</script>

