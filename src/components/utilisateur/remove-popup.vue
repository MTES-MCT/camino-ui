<template>
  <Popup :messages="messages">
    <template #header>
      <h2>Suppression du compte utilisateur</h2>
    </template>

    <p class="bold">
      Souhaitez vous supprimer le compte de {{ utilisateur.prenom }}
      {{ utilisateur.nom }} ?
    </p>
    <div class="bg-warning color-bg p-s mb-l">
      <span class="bold"> Attention </span>: cette opération est définitive et
      ne peut pas être annulée.
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            id="cmn-utilisateur-remove-popup-button-supprimer"
            class="btn-flash rnd-xs p-s full-x"
            @click="remove"
          >
            Supprimer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Suppression en cours…</div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoUtilisateurRemovePopup',

  components: {
    Popup
  },

  props: {
    utilisateur: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
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
    async remove() {
      await this.$store.dispatch('utilisateur/remove', this.utilisateur.id)
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
        this.remove()
      }
    }
  }
}
</script>
