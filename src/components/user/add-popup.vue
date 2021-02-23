<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2 class="mb-0">Création d'un compte utilisateur</h2>
      </div>
    </template>

    <div>
      <p>Renseignez votre email pour créer votre compte.</p>
      <hr />
    </div>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          id="cmn-user-add-popup-input-email"
          v-model="email"
          type="email"
          class="p-s"
          placeholder="Email"
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
            id="cmn-user-add-popup-button-valider"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Valider
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
import emailValidator from 'email-validator'

export default {
  name: 'CaminoUserAccountCreatePopup',

  components: {
    Popup
  },

  data() {
    return {
      email: ''
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return emailValidator.validate(this.email)
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      if (this.complete) {
        this.$store.dispatch('user/addEmail', this.email)
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
