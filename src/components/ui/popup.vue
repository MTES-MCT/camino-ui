<template>
  <div class="popup fixed shadow full bg-bg">
    <div class="popup-header px-l pt-l pb">
      <slot name="header" />
    </div>
    <div class="popup-content px-l pt">
      <slot />
    </div>
    <div class="popup-footer px-l pt pb-l">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSystemPopup'
}
</script>
