<template>
  <div> 
    <button
      v-if="utilisateur.id" 
      class="btn-alt pill h5 p-s my--xs ml-xs"
      :class="{'active': menu.component && menu.component.name === 'UserMenu'}"
      alt="Url"
      @click="menuToggle"
    >
      <i class="icon-24 icon-24-user " />
    </button>
    <button
      v-else
      class="btn-alt pill h5 p-s my--xs ml-xs"
      alt="Url"
      @click="popupOpen"
    >
      <i class="icon-24 icon-24-login" />
    </button>
  </div>
</template>

<script>
import LoginPopup from './login-popup.vue'
import UserMenu from './user-menu.vue'

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
    popupOpen () {
      this.$store.commit('popupOpen', { component: LoginPopup, closeBtn: true })
    },
    popupClose () {
      this.$store.commit('popupClose')
    },
    logout () {
      this.$store.dispatch('utilisateur/logout')
    },
    menuToggle () {
      this.$store.dispatch('menuToggle', UserMenu)
    }
  }
}
</script>
  