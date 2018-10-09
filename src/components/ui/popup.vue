<template>
  <div>
    <div
      class="absolute full bg-inverse-alpha" 
      @click="closeDefault"
    />
    <div 
      class="popup fixed shadow full bg-bg"
    >
      <div class="popup-header flex flex-start px-l pt-l pb">
        <slot name="header" />
        <button
          v-if="closeBtn"
          class="btn-alt rnd-xs flex-right p-s"
          @click="closeDefault"
        >
          <i class="icon-24 icon-24-close" />
        </button>
      </div>
      <div class="popup-content px-l pt-l">
        <slot />
      </div>
      <div class="popup-footer px-l pt pb-l">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSystemPopup',

  computed: {
    closeBtn () {
      return this.$store.state.popup.closeBtn
    }
  },

  created () {
    if (this.closeBtn) {
      document.addEventListener('keyup', this.keyup)
    }
  },

  beforeDestroy () {
    if (this.closeBtn) {
      document.removeEventListener('keyup', this.keyup)
    }
  },

  methods: {
    close () {
      this.$emit('popup-close')
      this.$store.commit('popupClose')
    },
    closeDefault () {
      if (this.closeBtn) {
        this.close()
      }
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close()
      }
    }
  }
}
</script>
