<template>
  <div>
    <div
      class="absolute full bg-inverse-alpha" 
      @click="closeDefault" />
    <div class="popup fixed shadow full bg-bg">
      <div class="popup-header flex flex-start p-l">
        <h2 class="mb-0">{{ config.title }}</h2>
        <button
          v-if="config.close"
          class="btn flex-right px-s py-xs mt--s"
          @click="closeDefault"><i class="icon-24 icon-24-close" /></button>
      </div>
      <div class="popup-content px-l pb-s pt">
        <component
          :is="config.component"
          @popup-close="close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSystemPopup',

  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },

  created () {
    if (this.config.close) {
      document.addEventListener('keyup', this.keyup)
    }
  },

  beforeDestroy () {
    if (this.config.close) {
      document.removeEventListener('keyup', this.keyup)
    }
  },

  methods: {
    close () {
      this.$emit('popup-close')
    },
    closeDefault () {
      if (this.config.close) {
        this.close()
      }
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close()
      }
    }
  }
};
</script>
