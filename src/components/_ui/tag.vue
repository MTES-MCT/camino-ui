<template>
  <span class="bold cap-first h6"
    ><span :class="css" class="py-xxs px-xs rnd-xs color-bg box"><slot /></span
  ></span>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'bg-neutral' },
    mini: { type: Boolean, default: false }
  },

  computed: {
    css() {
      const css = { [this.color]: true }

      if (this.mini) {
        css['py-xxs'] = true
        css['px-xs'] = true
      } else {
        css['py-xs'] = true
        css['px-s'] = true
      }

      return css
    }
  }
}
</script>
