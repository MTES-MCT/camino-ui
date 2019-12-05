<template>
  <Popup :messages="messages">
    <template slot="header">
      <h2 class="mb-0 mt-xs">
        Connexion
      </h2>
    </template>

    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-3 py-s">
        Email
      </div>
      <div class="tablet-blob-2-3">
        <input
          id="cmn-user-login-popup-input-email"
          v-model="email"
          type="email"
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
          id="cmn-user-login-popup-input-mot-de-passe"
          v-model="motDePasse"
          type="password"
          class="p-s"
        >
      </div>
    </div>

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            id="cmn-user-login-popup-button-se-connecter"
            class="btn-flash rnd-xs p-s full-x"
            @click="login"
          >
            Se connecter
          </button>
        </div>
      </div>
      <button
        id="cmn-user-login-popup-button-creer-votre-compte"
        class="btn-alt rnd-xs p-s h5 mr-s"
        @click="userAddPopupOpen"
      >
        Créer votre compte…
      </button>
      <button
        id="cmn-user-login-popup-button-reinitialiser"
        class="btn-alt rnd-xs p-s h5 mr-s"
        @click="userPasswordInitPopupOpen"
      >
        Réinitialiser votre mot de passe…
      </button>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import UserAdd from './add-popup.vue'
import UserPasswordInitPopup from './password-init-popup.vue'

export default {
  name: 'UiPopupLogin',

  components: {
    Popup
  },

  data() {
    return {
      email: '',
      motDePasse: ''
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return !!this.email && !!this.motDePasse
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async login() {
      if (this.complete) {
        await this.$store.dispatch('user/login', {
          email: this.email,
          motDePasse: this.motDePasse
        })
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.login()
      }
    },

    userAddPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UserAdd
      })
    },

    userPasswordInitPopupOpen() {
      this.$store.commit('popupOpen', {
        component: UserPasswordInitPopup
      })
    }
  }
}
</script>
