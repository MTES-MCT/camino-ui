<template>
  <popup>
    <template slot="header">
      <h2 class="mb-0 mt-xs">Connexion</h2>
    </template>

    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-3 py-s">
        Email
      </div>
      <div class="tablet-blob-2-3">
        <input 
          v-model="email"
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
        <div class="mb tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >Annuler</button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="login"
          >M'identifier</button>
        </div>
      </div>
      <button 
        class="btn-alt rnd-xs p-s h5 mr-s" 
        @click="userAddPopupOpen"
      >Créer votre compte…</button>
      <button 
        class="btn-alt rnd-xs p-s h5 mr-s" 
        @click="userPasswordInitPopupOpen"
      >Initialiser votre mot de passe…</button>
    </template>
  </popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'
import UtilisateurEditPopup from '../utilisateur/edit-popup.vue'
import UtilisateurPasswordInitPopup from './password-init-popup.vue'

export default {
  name: 'UiPopupLogin',

  components: {
    Popup,
    Messages
  },

  data () {
    return {
      email: '',
      motDePasse: ''
    }
  },

  computed: {
    messages () {
      return this.$store.state.user.popupMessages
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    login () {
      this.$store.dispatch('user/login', { email: this.email, motDePasse: this.motDePasse })
    },

    cancel () {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    errorsRemove () {
      this.$store.commit('user/popupMessagesRemove')
    },

    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.login()
      }
    },

    userAddPopupOpen () {
      this.$store.commit('popupOpen', {
        component: UtilisateurEditPopup,
        props: {
          utilisateur: { permission: { id: 'defaut' } },
          creation: true
        }
      })
    },

    userPasswordInitPopupOpen () {
      this.$store.commit('popupOpen', {
        component: UtilisateurPasswordInitPopup
      })
    }
  }
}
</script>
