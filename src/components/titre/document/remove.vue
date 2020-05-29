<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ context.title }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          Suppression du document
        </h2>
      </div>
    </template>

    <p class="bold">
      Souhaitez vous supprimer le document <span class="color-inverse">{{ document.type.nom }}</span> de <span class="color-inverse">{{ context.title }}</span> ?
    </p>
    <div class="bg-warning color-bg p-s mb-l">
      <span class="bold">
        Attention
      </span>: cette opération est définitive et ne peut pas être annulée.
    </div>

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
            @click="remove"
          >
            Supprimer
          </button>
          <div
            v-else
            class="p-s full-x bold"
          >
            Suppression en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../../_ui/popup.vue'

export default {
  name: 'CaminoDocumentRemovePopup',

  components: {
    Popup
  },

  props: {
    context: { type: Object, required: true },
    document: { type: Object, default: () => ({}) }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    loading() {
      return this.$store.state.popup.loading
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async remove() {
      await this.$store.dispatch('document/remove', {
        id: this.document.id,
        context: this.context
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    },

    errorsRemove() {}
  }
}
</script>
