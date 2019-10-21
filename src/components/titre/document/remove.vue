<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ demarcheTypeNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ etapeTypeNom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          Suppression du document
        </h2>
      </div>
    </template>

    <p class="bold">
      Souhaitez vous supprimer le document <span class="color-inverse">{{ document.type.nom }}</span> de l'étape <span class="color-inverse">{{ etapeTypeNom }}</span> de la démarche <span class="color-inverse">{{ demarcheTypeNom }}</span> du titre <span class="color-inverse">{{ titreNom }}</span> ?
    </p>
    <div class="bg-warning color-bg p-s mb-l">
      <span class="bold">
        Attention
      </span>: cette opération est définitive et ne peut pas être annulée.
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
import Popup from '../../ui/popup.vue'
import Messages from '../../ui/messages.vue'

export default {
  name: 'CaminoDocumentDeletePopup',

  components: {
    Popup,
    Messages
  },

  props: {
    demarcheTypeNom: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    etapeTypeNom: { type: String, default: '' },
    document: { type: Object, default: () => ({}) }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
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
      this.$store.dispatch('titre/documentDelete', this.document.id)
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
