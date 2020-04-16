<template>
  <div class="popup fixed shadow full bg-bg">
    <div class="popup-header px-l pt-l pb">
      <slot name="header" />
    </div>
    <div class="popup-content px-l py">
      <slot />
    </div>
    <div class="popup-footer px-l pt pb-l">
      <Messages
        id="cmn-ui-popup-messages"
        :messages="messages"
      />
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import Messages from './messages.vue'
export default {
  name: 'UiSystemPopup',

  components: {
    Messages
  },

  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
}
</script>
