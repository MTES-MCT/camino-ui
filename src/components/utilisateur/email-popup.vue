<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h2 class="mb-0">Modification de l’email</h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nouvel email</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="emailNouveau"
          type="email"
          class="p-s mb-s"
          placeholder="Email"
        />
      </div>
    </div>
    <hr />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3" :class="{ disabled: !complete }">
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
          <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoUtilisateurEmailPopup',

  components: {
    Popup
  },

  data() {
    return {
      emailNouveau: ''
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return this.emailNouveau
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
        await this.$store.dispatch('utilisateur/emailVerification', {
          email: this.emailNouveau
        })
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
