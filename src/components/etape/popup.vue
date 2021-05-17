<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first"> {{ titreNom }} </span>
          <span class="color-neutral"> | </span>
          <span class="cap-first">
            {{ demarcheType.nom }}
          </span>
        </h6>
        <h2 class="cap-first">
          {{ etapeId ? "Modification de l'" : "Ajout d'une " }}étape
        </h2>
      </div>
    </template>

    <div v-if="dateIsVisible" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Date</h5>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate v-model="newDate" class="mb" />
      </div>
    </div>

    <div v-else-if="!etape">
      <p>Chargement en cours…</p>
    </div>

    <div v-else>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Date</h5>
        </div>
        <div class="tablet-blob-2-3">
          <InputDate
            v-model="etape.date"
            :class="{ 'mb-s': etape.date, mb: !etape.date }"
          />
          <div class="h6">
            <label v-if="etape.date">
              <input v-model="etape.incertitudes.date" type="checkbox" />
              Incertain
            </label>
          </div>
        </div>
      </div>

      <hr />

      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Type</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            :value="etape.typeId"
            class="p-s"
            @change="typeUpdate($event)"
          >
            <option
              v-for="eType in etapeTypes"
              :key="eType.id"
              :value="eType.id"
              :disabled="etape.typeId === eType.id"
            >
              {{ eType.nom }}
            </option>
          </select>
        </div>
      </div>

      <Edit
        v-if="heritageLoaded"
        v-model:etape="etape"
        :etape-types="etapeTypes"
        :domaine-id="domaineId"
        :events="events"
        @edit-complete-update="editCompleteUpdate"
      />
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
            v-if="dateIsVisible"
            ref="init-button"
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!newDate"
            :class="{ disabled: !newDate }"
            @click="init"
          >
            Valider
          </button>
          <button
            v-else
            ref="save-button"
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!complete"
            :class="{ disabled: !complete }"
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
import InputDate from '../_ui/input-date.vue'
import Popup from '../_ui/popup.vue'
import Edit from './edit.vue'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    InputDate,
    Edit
  },

  props: {
    etapeId: { type: String, default: null },
    demarcheId: { type: String, required: true },
    demarcheType: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' },
    titreNom: { type: String, default: '' }
  },

  data() {
    return {
      events: { saveKeyUp: true },
      newDate: new Date().toISOString().slice(0, 10),
      editComplete: false,

      heritageLoaded: false
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    etapeTypes() {
      return this.$store.state.titreEtape.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    dateIsVisible() {
      return !this.etapeId && !this.etape
    },

    documentsTypes() {
      return (
        this.etapeType &&
        this.etapeType.documentsTypes.filter(dt => !dt.optionnel)
      )
    },

    complete() {
      return this.etape && this.etape.date && this.editComplete
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)

    if (this.etapeId) {
      await this.init()

      this.heritageLoaded = true
    }
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  unmounted() {
    this.$store.commit('titreEtape/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreEtape/init', {
        titreDemarcheId: this.demarcheId,
        id: this.etapeId,
        date: this.newDate
      })
    },

    async save() {
      if (this.complete) {
        await this.$store.dispatch('titreEtape/upsert', this.etape)

        this.eventTrack({
          categorie: 'titre-sections',
          action: 'titre-etape-enregistrer',
          nom: this.etape.id
        })
      }
    },

    cancel() {
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13 && this.events.saveKeyUp) {
        if (this.dateIsVisible && this.newDate) {
          this.$refs['init-button'].focus()
          this.init()
        } else if (this.complete) {
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

    editCompleteUpdate(complete) {
      this.editComplete = complete
    },

    async typeUpdate(event) {
      const typeId = event.target.value

      this.heritageLoaded = false
      await this.$store.dispatch('titreEtape/heritageGet', {
        titreDemarcheId: this.demarcheId,
        typeId,
        date: this.newDate
      })

      this.heritageLoaded = true
    }
  }
}
</script>
