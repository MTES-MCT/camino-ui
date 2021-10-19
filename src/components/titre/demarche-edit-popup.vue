<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first"
            ><span class="cap-first"> {{ titreNom }} </span
            ><span class="color-neutral"> | </span
            ><span class="cap-first">
              {{ titreTypeNom }}
            </span>
          </span>
        </h6>
        <h2 class="cap-first">
          {{ label }}
        </h2>
      </div>
    </template>
    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Type</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="demarche.typeId" class="p-s mr">
            <option
              v-for="demarcheType in types"
              :key="demarcheType.id"
              :value="demarcheType.id"
              :disabled="demarche.typeId === demarcheType.id"
            >
              {{ demarcheType.nom }}
            </option>
          </select>
        </div>
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
            class="btn btn-primary"
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
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup
  },

  props: {
    demarche: { type: Object, default: () => ({}) },
    titreNom: { type: String, default: '' },
    titreTypeNom: { type: String, default: '' },
    creation: { type: Boolean, default: false },
    tabId: { type: String, required: true }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    label() {
      return `${
        this.creation ? "Ajout d'une" : 'Modification de la'
      } démarche ${this.tabId === 'travaux' ? 'de travaux' : ''}`
    },

    messages() {
      return this.$store.state.popup.messages
    },

    types() {
      return this.$store.state.titreDemarche.metas.types
        .filter(t => (this.tabId === 'travaux' ? t.travaux : !t.travaux))
        .filter(t => t.demarchesCreation)
    },

    complete() {
      return this.demarche.typeId
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreDemarche/init', this.demarche)
    },

    async save() {
      if (this.complete) {
        const demarche = JSON.parse(JSON.stringify(this.demarche))

        if (this.creation) {
          await this.$store.dispatch('titreDemarche/add', demarche)
        } else {
          await this.$store.dispatch('titreDemarche/update', demarche)
        }

        this.eventTrack({
          categorie: 'titre-sections',
          action: `titre-${this.tabId}-enregistrer`,
          nom: demarche.id
        })
      }
    },

    cancel() {
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

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    }
  }
}
</script>
