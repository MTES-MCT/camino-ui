<template>
  <div> 
    <button
      class="btn-alt pill h5 p-s my--xs ml-xs"
      :class="{'active': menu.component && menu.component.name === 'MainMenu'}"
      alt="Url"
      @click="menuToggle"
    >
      <i class="icon-24 icon-24-menu" />
    </button>
  </div>
</template>

<script>
import MainMenu from './main-menu.vue'

export default {
  data () {
    return {
      popupVisible: false
    }
  },

  computed: {
    utilisateur () {
      return this.$store.state.utilisateur
    },
    menu () {
      return this.$store.state.menu
    }
  },

  methods: {
    menuToggle () {
      this.$store.dispatch('menuToggle', MainMenu)
    }
  }
}
</script>
  