<template>
  <div>
    <button
      id="cmn-menu-button-button-menu"
      class="btn-alt pill h5 p-s"
      :class="{ active: menu.component && menu.component.name === 'MainMenu' }"
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
      this.trackMatomo()
      this.$store.dispatch('menuToggle', MainMenu)
    },
    trackMatomo() {
      this.$matomo.trackEvent('boutons', 'bouton', 'sections')
    }
  }
}
</script>
