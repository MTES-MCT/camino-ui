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
      <TypeEdit
        v-model:etape="etape"
        :user="user"
        :etape-types="etapeTypes"
        :etape-type="etapeType"
        :etape-is-demande="etapeIsDemande"
        @type-update="typeUpdate"
        @complete-update="typeCompleteUpdate"
      />

      <Edit
        v-model:etape="etape"
        :etape-type="etapeType"
        :domaine-id="domaineId"
        :events="events"
        :heritage-loaded="heritageLoaded"
        @complete-update="completeUpdate"
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
          <div v-else-if="etapeIsDemande" class="tablet-blobs">
            <div class="tablet-blob-1-2">
              <button
                ref="en-construction-button"
                class="rnd-xs p-s full-x mb-s"
                :disabled="!typeComplete"
                :class="{
                  disabled: !typeComplete,
                  'btn-flash': !complete,
                  btn: complete
                }"
                @click="save(false)"
              >
                En construction
              </button>
            </div>
            <div class="tablet-blob-1-2">
              <button
                ref="save-depose-button"
                class="btn-flash rnd-xs p-s full-x"
                :disabled="!complete"
                :class="{ disabled: !complete }"
                @click="save(true)"
              >
                Déposer
              </button>
            </div>
          </div>
          <button
            v-else
            ref="save-button"
            class="btn-flash rnd-xs p-s full-x mb-s"
            :disabled="!complete"
            :class="{
              disabled: !complete
            }"
            @click="save"
          >
            Valider
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

import TypeEdit from './type-edit.vue'

export default {
  name: 'CaminoEtapePopup',

  components: { Popup, InputDate, Edit, TypeEdit },

  props: {
    etapeId: { type: String, default: null },
    demarcheId: { type: String, required: true },
    demarcheType: { type: Object, default: () => ({}) },
    domaineId: { type: String, required: true },
    titreNom: { type: String, default: '' }
  },

  data() {
    return {
      events: { saveKeyUp: true },
      newDate: new Date().toISOString().slice(0, 10),
      editComplete: false,
      typeComplete: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user.element
    },

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

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    dateIsVisible() {
      return !this.etapeId && !this.etape
    },

    complete() {
      return (
        this.etape && this.etape.date && this.typeComplete && this.editComplete
      )
    },

    heritageLoaded() {
      return this.$store.state.titreEtape.heritageLoaded
    },

    etapeIsDemande() {
      return !!this.etape && ['mfr', 'mfm'].includes(this.etape.typeId)
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)

    if (this.etapeId) {
      await this.init()
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
        date: this.newDate,
        fromPopup: true
      })
    },

    async save(depose) {
      if (
        (this.etapeIsDemande && !depose && this.typeComplete) ||
        this.complete
      ) {
        await this.$store.dispatch('titreEtape/upsert', {
          etape: this.etape,
          fromPopup: true,
          depose
        })

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
        } else if (this.complete && !this.etapeIsDemande) {
          this.$refs['save-button'].focus()
          this.save(false)
        } else if (this.complete && this.etapeIsDemande) {
          this.$refs['save-depose-button'].focus()
          this.save(true)
        }
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete
    },

    completeUpdate(complete) {
      this.editComplete = complete
    },

    async typeUpdate(typeId) {
      await this.$store.dispatch('titreEtape/heritageGet', {
        titreDemarcheId: this.demarcheId,
        typeId,
        date: this.newDate,
        fromPopup: true
      })
    }
  }
}
</script>
