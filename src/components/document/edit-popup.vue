<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first">
            {{ title }}
          </span>
        </h6>
        <h2 class="cap-first">
          {{ document.id ? 'Modification du' : "Ajout d'un" }} document
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Type</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-if="!document.id" v-model="document.typeId" class="p-s">
          <option
            v-for="dt in types"
            :key="dt.id"
            :value="dt.id"
            :disabled="document.typeId === dt.id"
          >
            {{ dt.nom }}
          </option>
        </select>
        <div v-else-if="documentType" class="p-s">
          {{ documentType.nom }}
        </div>
      </div>
    </div>

    <hr />

    <SectionsEdit
      v-model:document="document"
      :repertoire="repertoire"
      :user-is-admin="userIsAdmin"
    />

    <template #footer>
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
            ref="save-button"
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!complete"
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
import SectionsEdit from './sections-edit.vue'

export default {
  name: 'CaminoDocumentEditPopup',

  components: {
    Popup,
    SectionsEdit
  },

  props: {
    title: { type: String, required: true },
    route: { type: Object, default: null },
    action: { type: Object, default: null },
    document: { type: Object, required: true },
    repertoire: { type: String, required: true },
    parentTypeId: { type: String, default: '' },
    documentsTypes: { type: Array, default: null }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    complete() {
      return (
        this.document.typeId &&
        this.document.date &&
        (this.document.uri ||
          this.document.url ||
          this.document.fichier ||
          this.document.fichierNouveau)
      )
    },

    messages() {
      return this.$store.state.popup.messages
    },

    types() {
      if (this.documentsTypes) {
        return this.documentsTypes
      }
      return this.$store.state.document.metas.documentsTypes
    },

    documentType() {
      return this.types && this.types.find(d => d.id === this.document.typeId)
    },

    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)
    await this.get()
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      if (!this.documentsTypes) {
        const options = { repertoire: this.repertoire }

        if (this.parentTypeId) {
          options.typeId = this.parentTypeId
        }

        await this.$store.dispatch('document/init', options)
      }
    },

    async save() {
      await this.$store.dispatch('document/upsert', {
        document: this.document,
        route: this.route,
        action: this.action
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-etape-doc-enregistrer',
        nom: this.document.titreEtapeId
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if (!this.loading) {
        if ((e.which || e.keyCode) === 27) {
          this.cancel()
        } else if ((e.which || e.keyCode) === 13 && this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    errorsRemove() {}
  }
}
</script>
