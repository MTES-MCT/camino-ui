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

    <div
      v-if="modification"
      class="p-s bg-info color-bg mb"
    >
      Besoin d'aide pour remplir ce rapport ? Appelez le 06.61.26.42.89
    </div>

    <EditSections
      :sections="activite.sections"
      :element.sync="activite"
      :modification="modification"
      @completed:update="completedUpdate"
    />

    <div
      v-if="!modification && completed"
      id="cmn-titre-activite-edit-popup-warning"
      class="p-s bg-warning color-bg bold mb"
    >
      Une fois validé ce formulaire ne sera plus modifiable.
    </div>

    <template slot="footer">
      <div
        v-if="modification"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
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
      <div
        v-else
        class="tablet-blobs"
      >
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
          <div
            v-if="!loading"
            class="tablet-blobs"
          >
            <div class="tablet-blob-1-2 mb tablet-mb-0">
              <button
                id="cmn-titre-activite-edit-popup-button-enregistrer"
                class="rnd-xs p-s full-x"
                :class="{ 'btn-flash': !completed, 'btn-border': completed }"
                @click="save(false)"
              >
                Enregistrer
              </button>
            </div>
            <div
              class="tablet-blob-1-2"
              :class="{ disabled: !completed }"
            >
              <button
                class="btn-flash rnd-xs p-s full-x"
                @click="completed && save(true)"
              >
                Valider
              </button>
            </div>
          </div>
          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'
import EditSections from '../_common/edit-sections.vue'

export default {
  name: 'CaminoTitreActivitesRapportEditPopup',

  components: {
    Popup,
    EditSections
  },

  props: {
    activite: { type: Object, required: true },
    context: { type: Object, required: true }
  },

  data() {
    return {
      modification: true,
      checkboxesValues: [],
      completed: false
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    completedUpdate(completed) {
      this.completed = completed
    },

    preview() {
      this.modification = false
    },

    edit() {
      this.errorsRemove()
      this.modification = true
    },

    async save(confirmation) {
      if (confirmation && this.completed) {
        this.activite.statut.id = 'dep'
      } else {
        this.activite.statut.id = 'enc'
      }

      if (!this.activite.contenu) {
        delete this.activite.contenu
      }

      this.errorsRemove()
      await this.$store.dispatch('titreActivite/update', {
        activite: this.activite,
        context: this.context
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        if (this.modification) {
          this.cancel()
        } else {
          this.edit()
        }
      } else if ((e.which || e.keyCode) === 13) {
        if (this.modification) {
          this.preview()
        } else {
          if (this.completed) {
            this.save(true)
          } else {
            this.save(false)
          }
        }
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
