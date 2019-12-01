<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h2 class="mb-0">
          Réinitialisation du mot de passe
        </h2>
      </div>
    </template>

    <p>
      Pour réinitialiser votre mot de passe, renseignez votre adresse email.
    </p>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="email"
          type="email"
          class="p-s"
          placeholder="Email"
        >
      </div>
    </div>

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.esc.native="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter.native="save"
          >
            Envoyer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'

export default {
  name: 'CaminoUtilisateurPasswordInitPopup',

  components: {
    Popup
  },

  data() {
    return {
      email: ''
    }
  },

  computed: {
    complete() {
      return !!this.email
    },

    messages() {
      return this.$store.state.popup.messages
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      if (this.complete) {
        await this.$store.dispatch('user/passwordInitEmail', this.email)
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
