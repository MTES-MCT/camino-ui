<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: titre.id } }"
        class="cap-first"
      >
        {{ titre.nom }}
      </router-link>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ demarcheType.nom }}
      </span>
    </h6>
    <h1>Étape</h1>

    <div v-if="dateIsVisible" class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Date</h5>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate v-model="newDate" class="mb" />
      </div>
    </div>

    <Edit
      v-else
      :etape="editedEtape"
      :user="user"
      :events="events"
      :etape-is-demande="etapeIsDemande"
      :domaine-id="domaineId"
      :titre-type-id="titreTypeTypeId"
      @complete-update="completeUpdate"
      @type-complete-update="typeCompleteUpdate"
    />

    <div v-if="loading" class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <div class="p-s bold mb">Enregistrement en cours…</div>
      </div>
    </div>

    <div v-else-if="dateIsVisible" class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          ref="date-button"
          class="btn-flash rnd-xs p-s full-x"
          :disabled="!newDate"
          :class="{ disabled: !newDate }"
          @click="dateUpdate"
        >
          Valider
        </button>
      </div>
    </div>

    <div v-else class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-etape-edit-button-enregistrer"
          ref="save-button"
          class="btn-flash rnd-xs p-s full-x"
          @click="save"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utils'
import Loader from './_ui/loader.vue'
import InputDate from './_ui/input-date.vue'
import Edit from './etape/edit.vue'

export default {
  components: { Loader, Edit, InputDate },

  data() {
    return {
      complete: false,
      typeComplete: false,
      newDate: new Date().toISOString().slice(0, 10),
      events: { saveKeyUp: true }
    }
  },

  computed: {
    loaded() {
      return this.$store.state.titreEtapeEdition.loaded
    },

    user() {
      return this.$store.state.user.element
    },

    etapeId() {
      return this.$route.params.id
    },

    editedEtape() {
      return this.$store.state.titreEtapeEdition.element
    },

    demarche() {
      return this.$store.state.titreEtapeEdition.metas.demarche
    },

    demarcheType() {
      return this.demarche ? this.demarche.type : ''
    },

    titre() {
      return this.demarche ? this.demarche.titre : ''
    },

    domaineId() {
      return this.titre ? this.titre.domaine.id : ''
    },

    titreType() {
      return this.titre ? this.titre.type : ''
    },

    titreTypeTypeId() {
      return this.titreType ? this.titreType.type.id : ''
    },

    dateIsVisible() {
      return !this.editedEtape.date
    },

    loading() {
      return (
        this.$store.state.loading.includes('titreEtapeUpdate') ||
        this.$store.state.loading.includes('titreEtapeMetasGet') ||
        this.$store.state.loading.includes('titreEtapeGet') ||
        this.$store.state.loading.includes('titreEtapeEtapesTypesGet')
      )
    },

    etapeIsDemande() {
      return this.editedEtape?.typeId === 'mfr'
    },

    isPopupOpen() {
      return !!this.$store.state.popup.component
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()

    document.addEventListener('keyup', this.keyUp)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  unmounted() {
    this.$store.commit('titreEtapeEdition/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreEtapeEdition/init', {
        titreDemarcheId: this.$route.query['demarche-id'],
        id: this.etapeId,
        date: this.newDate
      })
    },

    async save() {
      if ((this.etapeIsDemande && this.typeComplete) || this.complete) {
        await this.$store.dispatch('titreEtapeEdition/upsert', {
          etape: this.editedEtape
        })

        this.eventTrack({
          categorie: 'titre-etape',
          action: 'titre-etape-enregistrer',
          nom: this.editedEtape.id
        })
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    keyUp(e) {
      if (
        (e.which || e.keyCode) === 13 &&
        this.events.saveKeyUp &&
        this.complete &&
        !this.isPopupOpen
      ) {
        if (this.dateIsVisible && this.newDate) {
          this.$refs['date-button'].focus()
          this.dateUpdate()
        } else if (
          !this.loading &&
          ((this.etapeIsDemande && this.typeComplete) || this.complete)
        ) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    },

    completeUpdate(complete) {
      this.complete = complete
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete
    },

    async dateUpdate() {
      await this.$store.dispatch('titreEtapeEdition/dateUpdate', {
        date: this.newDate
      })
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
