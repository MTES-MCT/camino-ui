<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h6>
          <span class="cap-first">
            {{ activite.type.nom }}
          </span>
        </h6>
        <h2 class="cap-first mb-0">
          <span v-if="activite.periode">{{ activite.periode.nom }}</span>
          {{ activite.annee }}
        </h2>
      </div>
    </template>

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
      :element.sync="activite"
      :modifiable="modifiable"
      :sections="activite.sections"
      @complete-update="activiteCompleteUpdate"
    />

    <div v-if="activite.documentsCreation && activite.type.documentsTypes">
      <DocumentsEdit
        :documents.sync="activite.documents"
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

    <template slot="footer">
      <div v-if="modifiable" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            id="cmn-titre-activite-edit-popup-button-previsualiser"
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
                class="rnd-xs p-s full-x"
                :class="{ 'btn-flash': !complete, 'btn-border': complete }"
                @click="save(false)"
              >
                Enregistrer
              </button>
            </div>
            <div class="tablet-blob-1-2">
              <button
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
import EditSections from '../_common/edit-sections.vue'
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

  beforeDestroy() {
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

    async save(confirmation) {
      this.errorsRemove()

      if (!this.activite.contenu) {
        delete this.activite.contenu
      }

      if (this.activite.documents.length || this.documentsIds.length) {
        this.activite.statut.id = 'enc'

        const res = await this.$store.dispatch('titreActivite/update', {
          activite: this.activite
        })

        if (res === 'success') {
          // supprime les documents qui n'ont pas de fichier
          for (const documentId of this.documentsIds) {
            const document = this.activite.documents.find(
              d => d.id === documentId
            )

            if (!document || !(document.fichier || document.fichierNouveau)) {
              await this.$store.dispatch('document/remove', {
                id: documentId
              })
            }
          }

          // met à jour ou ajoute les documents
          for (const document of this.activite.documents) {
            if (
              (document.fichier || document.fichierNouveau) &&
              document.date
            ) {
              if (document.id) {
                await this.$store.dispatch('document/update', { document })
              } else {
                await this.$store.dispatch('document/add', { document })
              }
            }
          }
        }
      }

      this.activite.statut.id = confirmation && this.complete ? 'dep' : 'enc'

      await this.$store.dispatch('titreActivite/update', {
        activite: this.activite,
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
          this.preview()
        } else {
          if (this.complete) {
            this.save(true)
          } else {
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
