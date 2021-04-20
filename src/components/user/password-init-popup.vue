<template>
  <Popup :messages="messages">
    <template #header>
      <h2>Réinitialisation du mot de passe</h2>
    </template>

    <p>
      Pour réinitialiser votre mot de passe, renseignez votre adresse email.
    </p>
    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input v-model="email" type="email" class="p-s" placeholder="Email" />
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
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            @click="save"
          >
            Envoyer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

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

  beforeUnmount() {
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
        if (this.complete) {
          this.save()
        }
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
