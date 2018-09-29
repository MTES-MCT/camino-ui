<template>
  <div> 
    <button
      v-if="utilisateur.id" 
      class="btn-alt pill h5 p-s my--xs ml-xs"
      alt="Url"
      @click="logout"
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
import PopupLogin from './popup-login.vue'

export default {
  data () {
    return {
      popupVisible: false
    }
  },

  computed: {
    utilisateur () {
      return this.$store.state.utilisateur
    }
  },

  methods: {
    popupOpen () {
      this.$store.commit('popupOpen', { component: PopupLogin, closeBtn: true })
    },
    popupClose () {
      this.$store.commit('popupClose')
    },
    logout () {
      this.$store.dispatch('utilisateur/logout')
    }
  }
}
</script>
  