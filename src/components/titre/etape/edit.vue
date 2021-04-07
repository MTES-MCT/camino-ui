<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h5>
          <span class="cap-first"> {{ titreNom }} </span>
          <span class="color-neutral"> | </span>
          <span class="cap-first">
            {{ demarcheType.nom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ etapeId ? "Modification de l'" : "Ajout d'une " }}étape
        </h2>
      </div>
    </template>

    <div v-if="dateIsVisible" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date</h6>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate v-model="newDate" class="mb" />
      </div>
    </div>

    <div v-else-if="!initialized">
      <p>Chargement en cours…</p>
    </div>

    <div v-else>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date</h6>
        </div>
        <div class="tablet-blob-2-3">
          <InputDate
            v-model="etape.date"
            :class="{ 'mb-s': etape.date, mb: !etape.date }"
          />
          <div class="h5">
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
          <h6>Type</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="etape.typeId" class="p-s" @change="typeUpdate">
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

      <hr />

      <div v-if="heritageLoaded">
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3 tablet-pt-s pb-s">
            <h6>Statut</h6>
          </div>
          <div class="mb tablet-blob-2-3">
            <select v-model="etape.statutId" class="p-s">
              <option
                v-for="etapeStatut in etapesStatuts"
                :key="etapeStatut.id"
                :value="etapeStatut.id"
                :disabled="etape.statutId === etapeStatut.id"
              >
                {{ etapeStatut.nom }}
              </option>
            </select>
          </div>
        </div>
        <hr />

        <EtapeEditFondamentales
          v-if="etapeType.fondamentale"
          v-model:etape="etape"
          :domaine-id="domaineId"
        />

        <EtapeEditPoints
          v-if="etapeType.fondamentale"
          v-model:etape="etape"
          v-model:events="events"
        />

        <EditSections
          v-if="etapeType.sections"
          v-model:etape="etape"
          :sections="etapeType.sections"
          @complete-update="sectionsCompleteUpdate"
        />
      </div>

      <div v-if="etapeType.documentsTypes && documentsTypes.length">
        <DocumentsEdit
          v-model:documents="etape.documents"
          :parent-id="etape.id"
          :parent-type-id="etapeType.id"
          :documents-types="documentsTypes"
          repertoire="demarches"
          @complete-update="documentsCompleteUpdate"
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
import InputDate from '../../_ui/input-date.vue'
import Popup from '../../_ui/popup.vue'
import EtapeEditFondamentales from './edit-fondamentales.vue'
import EtapeEditPoints from './edit-points.vue'
import EditSections from './edit-sections.vue'
import DocumentsEdit from '../../document/edit-multi.vue'
import { contenuBuild } from '@/utils/contenu'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections,
    InputDate,
    DocumentsEdit
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
      initialized: false,
      heritageLoaded: false,
      documentsComplete: false,
      sectionsComplete: false
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
      return this.etapeTypes.find(et => et.id === this.etape.typeId) || {}
    },

    etapesStatuts() {
      return this.etapeType.etapesStatuts
    },

    dateIsVisible() {
      return !this.etapeId && !this.initialized
    },

    documentsTypes() {
      return this.etapeType.documentsTypes.filter(dt => !dt.optionnel)
    },

    complete() {
      return (
        this.etape &&
        this.etape.typeId &&
        this.etape.date &&
        this.etape.statutId &&
        (((!this.documentsTypes?.length || this.documentsComplete) &&
          this.sectionsComplete) ||
          this.etape.statutId === 'aco')
      )
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)

    if (this.etapeId) {
      this.init()

      this.heritageLoaded = true
    }
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreEtape/init', {
        titreDemarcheId: this.demarcheId,
        id: this.etapeId,
        date: this.newDate
      })

      this.initialized = true
    },

    async heritageGet() {
      this.heritageLoaded = false

      await this.$store.dispatch('titreEtape/heritageGet', {
        titreDemarcheId: this.demarcheId,
        typeId: this.etape.typeId,
        date: this.newDate
      })

      this.heritageLoaded = true
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
      this.errorsRemove()
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

    async typeUpdate() {
      await this.heritageGet()

      if (this.etapesStatuts.length === 1) {
        this.etape.statutId = this.etapesStatuts[0].id
      } else {
        this.etape.statutId = null
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    documentsCompleteUpdate(documentsComplete) {
      this.documentsComplete = documentsComplete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
