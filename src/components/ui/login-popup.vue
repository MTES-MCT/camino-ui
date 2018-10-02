<template>
  <popup
    @popup-close="errorsRemove"
  >
    <template slot="header">
      <h2 class="mb-0">Connexion</h2>
    </template>

    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-3 py-s">
        Identifiant
      </div>
      <div class="tablet-blob-2-3">
        <input 
          v-model="id"
          type="text" 
          class="p-s"
        >
      </div>
    </div>
    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-3 py-s">
        Mot de passe
      </div>
      <div class="tablet-blob-2-3">
        <input 
          v-model="motDePasse"
          type="password" 
          class="p-s"
        >
      </div>
    </div>

    <messages :messages="messages" />

    <template slot="footer">
      <button
        class="btn-flash rnd p-s full-x"
        @click="login"
        @keyup.enter="login"
      >M'identifier</button>
    </template>
  </popup>
</template>

<script>
import Popup from './popup.vue'
import Messages from './messages.vue'


export default {
  name: 'UiPopupLogin',

  components: {
    Popup,
    Messages
  },

  data () {
    return {
      id: '',
      motDePasse: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.utilisateur.loginMessages
    }
  },

  methods: {
    login () {
      this.$store.dispatch('utilisateur/connecter', { id: this.id, motDePasse: this.motDePasse })
    },

    errorsRemove () {
      this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
