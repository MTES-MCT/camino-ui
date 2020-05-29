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
          Ajout de justificatifs
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Type</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <ul class="list-sans px-m">
          <li
            v-for="document in documents"
            :key="document.id"
          >
            <label>
              <input
                type="checkbox"
                class="mr-s"
              > {{ document.type }} : {{ document.description }}
            </label>
          </li>
        </ul>
      </div>
    </div>
    <hr>

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
            Enregistrer
          </button>

          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../../_ui/popup.vue'
import Messages from '../../_ui/messages.vue'

export default {
  name: 'CaminoEtapeJustificatifsPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    context: { type: Object, required: true },
    id: { type: String, required: true },
    documentsIds: { type: Array, required: true },
    entreprisesIds: { type: Array, required: true }
  },

  data() {
    return {
      events: { saveKeyUp: true },
      warnings: [],
      documentsIdsNew: []
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    documents() {
      return this.$store.state.titreEtapeJustificatifs.metas.documents
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      await this.$store.dispatch(
        'titreEtapeJustificatifs/metasGet',
        this.entreprisesIds
      )
    },

    async save() {
      await this.$store.dispatch('titreEtapeJustificatifs/update', {
        id: this.id,
        documentsIds: ['2019-09-25-kbi-7e9dcaa9']
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13 && this.events.saveKeyUp) {
        this.save()
      }
    },

    fileRemove() {
      this.document.fichier = null
      this.document.fichierNouveau = null
      this.document.fichierTypeId = null
      this.warnings = []
    },

    errorsRemove() {},

    visibiliteUpdate(id) {
      this.visibiliteId = id

      this.document.publicLecture = id === 'public'
      this.document.entreprisesLecture = id === 'entreprise'
    }
  }
}
</script>
