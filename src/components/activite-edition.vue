<template>
  <h2>Activité</h2>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <router-link
        :to="{ name: 'titre', params: { id: activite.titre.slug } }"
        class="cap-first"
      >
        {{ activite.titre.nom }}
      </router-link>
    </h6>
    <h5>
      {{ dateFormat(activite.date) }} |
      <span class="cap-first"
        ><span v-if="activite.periode && activite.periode.nom"
          >{{ activite.periode.nom }}
        </span>
        {{ activite.annee }}</span
      >
    </h5>

    <div class="flex">
      <h3 class="mb-s">
        <span class="cap-first">{{ activite.type.nom }}</span>
      </h3>

      <HelpTooltip v-if="shouldDisplayHelp" class="ml-m">
        Tous les champs doivent être remplis même s’il n’y a pas eu
        d’extraction. Le cas échéant, indiquer seulement 0, puis enregistrer.
      </HelpTooltip>
    </div>

    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="activite.type.description"
      class="h6"
      v-html="activite.type.description"
    />

    <div class="p-s bg-info color-bg mb">
      Besoin d'aide pour remplir ce rapport ?
      <router-link
        to="/contacts"
        target="_blank"
        class="p-s bg-info color-bg mb"
        >Contactez-nous
      </router-link>
    </div>

    <SectionsEdit
      :contenu="activite.contenu"
      :sections="activite.sections"
      @contenu-update="activite.contenu = $event"
    />

    <DocumentsEdit
      v-model:documents="activite.documents"
      :add-action="{ name: 'titreActiviteEdition/documentAdd' }"
      :remove-action="{ name: 'titreActiviteEdition/documentRemove' }"
      repertoire="activites"
      document-popup-title="documentPopupTitle"
      :parent-type-id="activite.type.id"
      :documents-types="activite.type.documentsTypes"
    />

    <div class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-etape-edit-button-enregistrer"
          ref="save-button"
          class="btn btn-primary"
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
import HelpTooltip from './_ui/help-tooltip.vue'
import SectionsEdit from './_common/sections-edit.vue'
import DocumentsEdit from './document/multi-edit.vue'

export default {
  components: { Loader, SectionsEdit, DocumentsEdit, HelpTooltip },

  data() {
    return {
      events: { saveKeyUp: true }
    }
  },

  computed: {
    loaded() {
      return !this.$store.state.loading.includes('activiteEditionInit')
    },

    user() {
      return this.$store.state.user.element
    },

    activiteId() {
      return this.$route.params.id
    },

    activite() {
      return this.$store.state.titreActiviteEdition.element
    },

    shouldDisplayHelp() {
      return ['grp', 'gra'].includes(this.activite.type.id)
    },

    loading() {
      return false
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
    this.$store.commit('titreActiviteEdition/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreActiviteEdition/init', this.activiteId)
    },

    async save() {
      await this.$store.dispatch('titreActiviteEdition/update', this.activite)

      this.eventTrack({
        categorie: 'activite',
        action: 'activite-enregistrer',
        nom: this.activite.nom
      })
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
        !this.isPopupOpen &&
        !this.loading
      ) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
