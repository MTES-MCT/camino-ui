<template>
  <Popup :messages="messages">
    <template #header>
      <h2>Connexion</h2>
    </template>

    <div class="tablet-blobs mb">
      <label for="cmn-user-login-popup-input-email" class="tablet-blob-1-3 py-s"
        >Email</label
      >
      <div class="tablet-blob-2-3">
        <input
          id="cmn-user-login-popup-input-email"
          v-model="email"
          type="email"
          class="p-s"
        />
      </div>
    </div>
    <div class="tablet-blobs mb">
      <label
        for="cmn-user-login-popup-input-mot-de-passe"
        class="tablet-blob-1-3 py-s"
        >Mot de passe</label
      >
      <div class="tablet-blob-2-3">
        <input
          id="cmn-user-login-popup-input-mot-de-passe"
          v-model="motDePasse"
          type="password"
          class="p-s"
        />
      </div>
    </div>

    <template #footer>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            id="cmn-user-login-popup-button-se-connecter"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            class="btn btn-primary mb"
            @click="login"
          >
            Se connecter
          </button>
        </div>
      </div>
      <ul class="list-inline mb-0">
        <li>
          <button
            id="cmn-user-cerbere-login-popup-button-creer-votre-compte"
            class="btn-border small rnd-xs py-xs px-s mr-s mb-s tablet-mb-0"
            @click="userAddPopupOpen"
          >
            Créer un compte…
          </button>
        </li>
        <li>
          <button
            id="cmn-user-login-popup-button-reinitialiser"
            class="btn-border small rnd-xs py-xs px-s mr-s mb-s tablet-mb-0"
            @click="userPasswordInitPopupOpen"
          >
            Réinitialiser son mot de passe…
          </button>
        </li>

        <li>
          <button
            id="cmn-user-login-popup-button-reinitialiser"
            class="btn-border small rnd-xs py-xs px-s mr-s"
            @click="cerbereLogin"
          >
            Se connecter avec Cerbère…
          </button>
        </li>
      </ul>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
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

  beforeUnmount() {
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
        if (this.complete) {
          this.login()
        }
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
    },

    async cerbereLogin() {
      const query = { ...this.$route.query }

      if (
        query.ticket ||
        !query.authentification ||
        query.authentification !== 'cerbere' ||
        query.TARGET
      ) {
        delete query.ticket
        delete query.authentification
        delete query.TARGET

        query.authentification = 'cerbere'

        await this.$router.replace({ query })
      }

      const currentUrlEncoded = encodeURIComponent(window.location.href)

      const redirectUrl = await this.$store.dispatch(
        'user/cerbereUrlGet',
        currentUrlEncoded
      )

      window.location.href = redirectUrl
    }
  }
}
</script>
