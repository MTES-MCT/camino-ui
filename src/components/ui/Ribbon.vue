<template>
  <div class="ribbon">
    <div class="relative full-y">
      <div class="absolute full ribbon-bloc">
        <span class="p-xs">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSystemRibbon',

  props: {
    value: {
      type: String,
      default: 'UI System'
    }
  }
}
</script>

