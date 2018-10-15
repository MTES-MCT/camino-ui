<template>
  <popup
    @popup-close="errorsRemove"
  >
    <template slot="header">
      <h2 class="mb-0 mt-xs">Connexion</h2>
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
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.enter="cancel"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="login"
            @keyup.enter="login"
          >M'identifier</button>
        </div>
      </div>
    </template>
  </popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

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
      return this.$store.state.user.popupMessages
    }
  },

  methods: {
    login () {
      this.$store.dispatch('user/login', { id: this.id, motDePasse: this.motDePasse })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    errorsRemove () {
      this.$store.commit('user/popupMessagesRemove')
    }
  }
}
</script>
