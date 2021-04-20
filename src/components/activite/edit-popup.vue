<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first">
            {{ activite.type.nom }}
          </span>
        </h6>
        <h2 class="cap-first">
          <span v-if="activite.periode">{{ activite.periode.nom }}</span>
          {{ activite.annee }}
        </h2>
      </div>
    </template>

    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="activite.type.description"
      class="h5 mb cap-first"
      v-html="activite.type.description"
    />

    <div v-if="modifiable" class="p-s bg-info color-bg mb">
      Besoin d'aide pour remplir ce rapport ?
      <router-link
        to="/contacts"
        target="_blank"
        class="p-s bg-info color-bg mb"
        >Contactez-nous
      </router-link>
    </div>

    <EditSections
      v-model:element="activite"
      :modifiable="modifiable"
      :sections="activite.sections"
      @complete-update="activiteCompleteUpdate"
    />

    <div v-if="activite.documentsCreation && activite.type.documentsTypes">
      <DocumentsEdit
        v-model:documents="activite.documents"
        :modifiable="modifiable"
        :parent-id="activite.id"
        :parent-type-id="activite.type.id"
        :documents-types="activite.type.documentsTypes"
        repertoire="activites"
        @complete-update="documentsCompleteUpdate"
      />
    </div>

    <div
      v-if="!modifiable && complete"
      id="cmn-titre-activite-edit-popup-warning"
      class="p-s bg-warning color-bg bold mb"
    >
      Une fois validé ce formulaire ne sera plus modifiable.
    </div>

    <template #footer>
      <div v-if="modifiable" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            id="cmn-titre-activite-edit-popup-button-previsualiser"
            ref="preview-button"
            class="btn-flash rnd-xs p-s full-x"
            @click="preview"
          >
            Prévisualiser
          </button>
        </div>
      </div>
      <div v-else class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            v-if="!loading"
            id="cmn-titre-activite-edit-popup-button-modifier"
            class="btn-border rnd-xs p-s full-x"
            @click="edit"
          >
            Modifier
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <div v-if="!loading" class="tablet-blobs">
            <div class="tablet-blob-1-2 mb tablet-mb-0">
              <button
                id="cmn-titre-activite-edit-popup-button-enregistrer"
                ref="save-button"
                class="rnd-xs p-s full-x"
                :class="{ 'btn-flash': !complete, 'btn-border': complete }"
                @click="save(false)"
              >
                Enregistrer
              </button>
            </div>
            <div class="tablet-blob-1-2">
              <button
                ref="validate-button"
                class="btn-flash rnd-xs p-s full-x"
                :disabled="!complete"
                :class="{ disabled: !complete }"
                @click="complete && save(true)"
              >
                Valider
              </button>
            </div>
          </div>
          <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
import EditSections from './edit-sections.vue'
import DocumentsEdit from '../document/edit-multi.vue'

export default {
  name: 'CaminoTitreActivitesRapportEditPopup',

  components: {
    Popup,
    EditSections,
    DocumentsEdit
  },

  props: {
    activite: { type: Object, required: true },
    context: { type: Object, required: true }
  },

  data() {
    return {
      modifiable: true,
      checkboxesValues: [],
      activiteComplete: false,
      documentsComplete: false,
      documentsIds: []
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return (
        this.activiteComplete &&
        (this.documentsComplete || !this.activite.documentsCreation)
      )
    }
  },

  created() {
    if (this.activite.documents && this.activite.documents.length) {
      this.documentsIds = this.activite.documents.map(d => d.id)
    }
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    activiteCompleteUpdate(complete) {
      this.activiteComplete = complete
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    preview() {
      this.modifiable = false
    },

    edit() {
      this.errorsRemove()
      this.modifiable = true
    },

    async save(depose) {
      this.errorsRemove()

      if (!this.activite.contenu) {
        delete this.activite.contenu
      }

      await this.$store.dispatch('titreActivite/update', {
        activite: this.activite,
        depose,
        context: this.context
      })

      this.eventTrack({
        categorie: 'titre-sections',
        action: 'titre-activite-enregistrer',
        nom: this.activite.id
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        if (this.modifiable) {
          this.cancel()
        } else {
          this.edit()
        }
      } else if ((e.which || e.keyCode) === 13) {
        if (this.modifiable) {
          this.$refs['preview-button'].focus()
          this.preview()
        } else {
          if (this.complete) {
            this.$refs['validate-button'].focus()
            this.save(true)
          } else {
            this.$refs['save-button'].focus()
            this.save(false)
          }
        }
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
