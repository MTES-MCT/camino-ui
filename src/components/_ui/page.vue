<template>
  <div class="page relative">
    <slot name="banner" />

    <Transition name="slide" mode="out-in">
      <slot name="menu" />
    </Transition>

    <slot />

    <div class="messages">
      <slot name="messages" />
    </div>

    <Transition name="fade">
      <div v-if="slotPopup" class="absolute full bg-inverse-alpha z-2" />
    </Transition>

    <Transition name="slide-top">
      <slot name="popup" />
    </Transition>

    <Transition name="fade">
      <slot name="loader" />
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'UiPage',

  props: {
    slotPopup: { type: Boolean, default: false },
    slotBanner: { type: Boolean, default: false }
  }
}
</script>
