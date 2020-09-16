<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ title }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          Dissociation du justificatif
        </h2>
      </div>
    </template>

    <p class="bold">
      Souhaitez vous dissocier le justificatif
      <span class="color-inverse">{{ document.type.nom }}</span> de l'étape
      <span class="color-inverse">{{ title }}</span> ?
    </p>

    <Messages :messages="warnings" />

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
        <div class="tablet-blob-2-3">
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Dissocier
          </button>

          <div v-else class="p-s full-x bold">
            Enregistrement en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
import Messages from '../_ui/messages.vue'

export default {
  name: 'CaminoEtapeJustificatifUnlinkPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    context: { type: Object, required: true },
    title: { type: String, default: '' },
    id: { type: String, required: true },
    document: { type: Object, required: true }
  },

  data() {
    return {
      warnings: []
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
    document.addEventListener('keyup', this.keyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async save() {
      await this.$store.dispatch('titreEtapeJustificatifs/unlink', {
        id: this.id,
        documentId: this.document.id,
        context: this.context
      })
    },

    cancel() {
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    }
  }
}
</script>
