<template>
  <div
    :class="{ active: menu.component && menu.component.name === 'UserMenu' }"
  >
    <button
      v-if="user"
      id="cmn-user-button-menu"
      class="btn-border small pill p-s"
      alt="Url"
      @click="menuToggle"
    >
      <i class="icon-24 icon-user" />
    </button>
    <button
      v-else
      id="cmn-user-button-connexion"
      class="btn-border small pill lh-2 py-s px-m"
      alt="Url"
      @click="popupOpen"
    >
      Connexion
    </button>
  </div>
</template>

<script>
import UserLoginPopup from './login-popup.vue'
import UserMenu from './menu.vue'

export default {
  data() {
    return {
      popupVisible: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },
    menu() {
      return this.$store.state.menu
    }
  },

  methods: {
    popupOpen() {
      this.$store.commit('popupOpen', { component: UserLoginPopup })
    },
    popupClose() {
      this.$store.commit('popupClose')
    },
    logout() {
      this.$store.dispatch('user/logout')
    },
    menuToggle() {
      this.eventTrack()
      this.$store.dispatch('menuToggle', UserMenu)
    },
    eventTrack() {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu', 'bouton', 'utilisateur')
      }
    }
  }
}
</script>
