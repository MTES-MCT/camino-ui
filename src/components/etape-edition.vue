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
        :on-save="save"
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
import debounce from 'lodash.debounce'

export default {
  components: {
    Loader,
    Edit,
    InputDate,
    FormSaveBtn
  },

  data() {
    return {
      complete: false,
      typeComplete: false,
      isButtonSticky: false,
      containerWidth: 0,
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
    },

    saveBtn() {
      return this.isButtonSticky
        ? this.$refs['save-btn-sticky']
        : this.$refs['save-btn']
    },

    handleStickyBtnDebounced() {
      return debounce(this.handleStickyBtn)
    }
  },

  watch: {
    user: 'init'
  },

  async created() {
    await this.init()

    document.addEventListener('keyup', this.keyUp)
    document.addEventListener('scroll', this.handleStickyBtnDebounced)
    document.addEventListener('resize', this.handleStickyBtnDebounced)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
    document.removeEventListener('scroll', this.handleStickyBtnDebounced)
    document.removeEventListener('resize', this.handleStickyBtnDebounced)
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
          this.saveBtn.focusBtn()
          this.save()
        }
      }
    },

    handleStickyBtn() {
      const sticky = this.$refs['save-btn-container']
      if (!sticky) return

      const bottomBounds =
        sticky.getBoundingClientRect().y + sticky.getBoundingClientRect().height
      this.isButtonSticky = window.innerHeight < bottomBounds
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
