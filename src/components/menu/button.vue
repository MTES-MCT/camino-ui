<template>
  <div>
    <button
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
      this.$store.dispatch('menuToggle', MainMenu)
    }
  }
}
</script>
