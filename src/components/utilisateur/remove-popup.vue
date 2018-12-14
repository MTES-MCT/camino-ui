<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="mb-0">
          Suppression du compte utilisateur
        </h2>
      </div>
    </template>

    <p class="bold">
      Souhaitez vous supprimer le compte de {{ utilisateur.prenom }}
                                         {{ utilisateur.nom }} ?
    </p>
    <div class="bg-warning color-bg p-s mb-l">
      <span class="bold">
        Attention
      </span>: cette opération est définitive et
      ne peut pas être annulée.
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="remove"
          >
            Supprimer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

export default {
  name: 'CaminoUtilisateurRemovePopup',

  components: {
    Popup,
    Messages
  },

  props: {
    utilisateur: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    permissionList() {
      return this.$store.state.utilisateurs.permissions
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    remove() {
      this.$store.dispatch('utilisateurs/remove', this.utilisateur.id)
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
