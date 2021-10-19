<template>
  <Popup :messages="messages">
    <template #header>
      <h2>Modification du mot de passe</h2>
    </template>

    <div v-if="!permissionsCheck(user, 'super')">
      <div class="tablet-blobs">
        <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Mot de passe actuel</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <input
            v-model="motDePasse"
            type="password"
            class="p-s"
            placeholder="Mot de passe"
          />
        </div>
      </div>
      <hr />
    </div>

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Nouveau mot de passe</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasseNouveau1"
          type="password"
          class="p-s mb-s"
          placeholder="Mot de passe"
        />
        <p class="h6 mb-0">8 caractères minimum.</p>
      </div>
    </div>
    <hr />

    <div class="tablet-blobs">
      <div class="mb tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Nouveau mot de passe (vérification)</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="motDePasseNouveau2"
          type="password"
          class="p-s"
          placeholder="Mot de passe"
        />
      </div>
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
            ref="save-button"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            class="btn btn-primary rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </template>
  </Popup>
</template>

<script>
import { permissionsCheck } from '@/utils'
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoUtilisateurPasswordPopup',

  components: {
    Popup
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
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    user() {
      return this.$store.state.user.element
    },

    complete() {
      return (
        this.motDePasseNouveau1 &&
        this.motDePasseNouveau2 &&
        (this.permissionsCheck(this.user, 'super') || this.motDePasse)
      )
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
        await this.$store.dispatch('utilisateur/passwordUpdate', {
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
        if (this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    },

    permissionToggle(permission) {
      this.utilisateur.permission = permission
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
