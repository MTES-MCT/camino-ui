<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: titre.slug } }"
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

    <div v-if="armHelpVisible" class="p-s bg-info color-bg mb">
      Besoin d'aide pour déposer votre demande d'ARM ? Contactez-nous au
      <a class="color-bg" href="tel:+33763429218">07.63.42.92.18</a>, ou par
      mail :
      <a class="color-bg" href="mailto:camino@beta.gouv.fr"
        >camino@beta.gouv.fr</a
      >
    </div>

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
      :etape-is-demande-en-construction="etapeIsDemandeEnConstruction"
      :domaine-id="domaineId"
      :titre-type-id="titreTypeTypeId"
      :document-popup-title="documentPopupTitle"
      :etape-type="etapeType"
      @complete-update="completeUpdate"
      @type-complete-update="typeCompleteUpdate"
      @change="editChange"
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

    <div
      v-else
      ref="save-btn-container"
      class="tablet-blobs pb-m pt-m bg-bg b-0 sticky"
    >
      <div class="tablet-blob-1-3" />
      <FormSaveBtn
        ref="save-btn"
        :arm-help-visible="armHelpVisible"
        :disabled="!isFormComplete"
        class="tablet-blob-2-3 flex flex-center"
        @click="save"
      />
    </div>
  </div>
</template>

<script>
import { cap, dateFormat } from '@/utils'
import Loader from './_ui/loader.vue'
import InputDate from './_ui/input-date.vue'
import Edit from './etape/edit.vue'
import FormSaveBtn from './etape/form-save-btn.vue'

export default {
  components: { Loader, Edit, InputDate, FormSaveBtn },

  beforeRouteLeave(_, __, next) {
    if (this.isFormDirty && !confirm(this.promptMsg)) {
      next(false)
    } else {
      next()
    }
  },

  data() {
    return {
      complete: false,
      isFormDirty: false,
      typeComplete: false,
      promptMsg: 'Quitter le formulaire sans enregistrer les changements ?',
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

    etapeType() {
      return this.$store.getters['titreEtapeEdition/etapeType']
    },

    demarche() {
      return this.$store.state.titreEtapeEdition.metas.demarche
    },

    demarcheType() {
      return this.demarche.type
    },

    titre() {
      return this.demarche.titre
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

    etapeIsDemandeEnConstruction() {
      return (
        this.etapeType?.id === 'mfr' && this.editedEtape?.statutId !== 'dep'
      )
    },

    isPopupOpen() {
      return !!this.$store.state.popup.component
    },

    isFormComplete() {
      return (
        (this.etapeIsDemandeEnConstruction && this.typeComplete) ||
        this.complete
      )
    },

    documentPopupTitle() {
      return `${cap(this.titre.nom)} | ${cap(this.demarcheType.nom)} | ${
        this.etapeType ? cap(this.etapeType.nom) : ''
      }`
    },

    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
    },

    armHelpVisible() {
      return (
        !this.userIsAdmin &&
        this.domaineId === 'm' &&
        this.titreTypeTypeId === 'ar' &&
        this.etapeType.id === 'mfr'
      )
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()

    document.addEventListener('keyup', this.keyUp)
    window.addEventListener('beforeunload', this.beforeWindowUnload)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
    window.removeEventListener('beforeunload', this.beforeWindowUnload)
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

    beforeWindowUnload(e) {
      if (!this.isFormDirty) return true
      e.returnValue = this.promptMsg
      return this.promptMsg
    },

    async save() {
      this.isFormDirty = false

      if (this.isFormComplete) {
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
          !this.dateIsVisible &&
          !this.loading &&
          this.isFormComplete
        ) {
          this.$refs['save-btn'].focusBtn()
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

    editChange() {
      if (!this.loaded) return
      this.isFormDirty = true
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
