<template>
  <div>
    <div
      class="absolute full bg-inverse-alpha" 
      @click="closeDefault"
    />
    <div class="popup fixed shadow full bg-bg">
      <div class="popup-header flex flex-start p-l">
        <h2 class="mb-0 cap-first"><slot name="header" /></h2>
        <button
          v-if="closeBtn"
          class="btn-alt rnd flex-right p-s mt--s"
          @click="closeDefault"
        >
          <i class="icon-24 icon-24-close" />
        </button>
      </div>
      <div class="popup-content px-l pt-l">
        <slot />
      </div>
      <div class="popup-footer px-l py-m">
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
