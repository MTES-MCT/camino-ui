<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2>Modification d'une entreprise</h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Téléphone</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="entreprise.telephone"
          type="text"
          class="p-s"
          placeholder="0100000000"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Adresse électronique</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="entreprise.email"
          type="text"
          class="p-s"
          placeholder="email@domain.tld"
        />
      </div>
    </div>

    <hr />
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Site internet</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <input
          v-model="entreprise.url"
          type="text"
          class="p-s"
          placeholder="http://…"
        />
      </div>
    </div>

    <template v-if="permissionsCheck(user, ['super'])">
      <hr />
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Archivée</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <input v-model="entreprise.archive" type="checkbox" class="p-s" />
        </div>
      </div>
    </template>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button ref="save-button" class="btn btn-primary" @click="save">
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
  name: 'CaminoEntrepriseEditPopup',

  components: {
    Popup
  },

  props: {
    entreprise: {
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
    },

    user() {
      return this.$store.state.user.element
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
    this.element = null
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      const entreprise = JSON.parse(JSON.stringify(this.entreprise))
      await this.$store.dispatch('entreprise/update', entreprise)
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    },

    permissionsCheck(user, permissions) {
      return permissionsCheck(user, permissions)
    }
  }
}
</script>
