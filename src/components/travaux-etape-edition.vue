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
        {{ travauxType.nom }}
      </span>
    </h6>
    <h1>Étape</h1>

    <Edit
      :etape="editedEtape"
      :document-popup-title="documentPopupTitle"
      @complete-update="completeUpdate"
    />

    <div v-if="loading" class="tablet-blobs">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <div class="p-s bold mb">Enregistrement en cours…</div>
      </div>
    </div>

    <div v-else class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-travaux-etape-edit-button-enregistrer"
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
  </div>
</template>

<script>
import { cap, dateFormat } from '@/utils'
import Loader from './_ui/loader.vue'
import Edit from './travaux-etape/edit.vue'

export default {
  components: { Loader, Edit },

  data() {
    return {
      complete: false,
      newDate: new Date().toISOString().slice(0, 10),
      events: { saveKeyUp: true }
    }
  },

  computed: {
    loaded() {
      return this.$store.state.titreTravauxEtapeEdition.loaded
    },

    user() {
      return this.$store.state.user.element
    },

    etapeId() {
      return this.$route.params.id
    },

    editedEtape() {
      return this.$store.state.titreTravauxEtapeEdition.element
    },

    etapeType() {
      return this.$store.getters['titreTravauxEtapeEdition/etapeType']
    },

    travaux() {
      return this.$store.state.titreTravauxEtapeEdition.metas.travaux
    },

    travauxType() {
      return this.travaux.type
    },

    titre() {
      return this.travaux.titre
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

    loading() {
      return (
        this.$store.state.loading.includes('titreTravauxEtapeUpdate') ||
        this.$store.state.loading.includes('titreTravauxEtapeMetasGet') ||
        this.$store.state.loading.includes('titreTravauxEtapeInit')
      )
    },

    isPopupOpen() {
      return !!this.$store.state.popup.component
    },

    documentPopupTitle() {
      return `${cap(this.titre.nom)} | ${cap(this.travauxType.nom)} | ${
        this.etapeType ? cap(this.etapeType.nom) : ''
      }`
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
    this.$store.commit('titreTravauxEtapeEdition/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreTravauxEtapeEdition/init', {
        titreTravauxId: this.$route.query['travaux-id'],
        id: this.etapeId,
        date: this.newDate
      })
    },

    async save() {
      if (this.complete) {
        await this.$store.dispatch('titreTravauxEtapeEdition/upsert', {
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
        !this.isPopupOpen &&
        !this.loading
      ) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    completeUpdate(complete) {
      this.complete = complete
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
