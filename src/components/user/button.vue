<template>
  <pure-button
    :menu-active="menu.component && menu.component.name === 'UserMenu'"
    :user="user"
    @onConnectionClicked="popupOpen"
    @onUserClicked="goToUser"
  />
</template>

<script>
import UserLoginPopup from './login-popup.vue'
import PureButton from './pure-button.vue'

export default {
  components: { PureButton },

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
    goToUser() {
      this.eventTrack()
      this.$router.push({ name: 'utilisateur', params: { id: this.user.id } })
    },
    eventTrack() {
      if (this.$matomo) {
        this.$matomo.trackEvent('menu', 'bouton', 'utilisateur')
      }
    }
  }
}
</script>
