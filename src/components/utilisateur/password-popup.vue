<template>
  <Popup>
    <template slot="header">
      <div>
        <h2 class="mb-0">
          Modification du mot de passe
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Mot de passe actuel</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasse"
          type="password"
          class="p-s"
          placeholder="Mot de passe"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nouveau mot de passe</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasseNouveau1"
          type="password"
          class="p-s"
          placeholder="Mot de passe"
        >
      </div>
    </div>
    <hr>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Nouveau mot de passe (vérification)</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasseNouveau2"
          type="password"
          class="p-s"
          placeholder="Mot de passe"
        >
      </div>
    </div>

    <template slot="footer">
      <Messages :messages="messages" />
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
            Enregistrer
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
  name: 'CaminoUtilisateurEditPopup',

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

  data() {
    return {
      motDePasse: '',
      motDePasseNouveau1: '',
      motDePasseNouveau2: ''
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },
    complete() {
      return (
        this.motDePasse && this.motDePasseNouveau1 && this.motDePasseNouveau2
      )
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
        this.$store.dispatch('utilisateurs/passwordUpdate', {
          id: this.utilisateur.id,
          motDePasse: this.motDePasse,
          motDePasseNouveau1: this.motDePasseNouveau1,
          motDePasseNouveau2: this.motDePasseNouveau2
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
    },

    permissionToggle(permission) {
      this.utilisateur.permission = permission
    }
  }
}
</script>
