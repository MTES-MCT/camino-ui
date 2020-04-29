<template>
  <div :class="{ active: menu.component && menu.component.name === 'MainMenu' }">
    <button
      id="cmn-menu-button-button-menu"
      class="btn-border pill h5 p-s"
      alt="Url"
      @click="menuToggle"
    >
      <i class="icon-24 icon-menu" />
    </button>
  </div>
</template>

<script>
import MainMenu from './menu.vue'

export default {
  data() {
    return {
      popupVisible: false
    }
  },

  computed: {
    menu() {
      return this.$store.state.menu
    }
  },

  methods: {
    menuToggle() {
      this.eventTrack()
      this.$store.dispatch('menuToggle', MainMenu)
    },
    eventTrack() {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu', 'bouton', 'sections')
      }
    }
  }
}
</script>
