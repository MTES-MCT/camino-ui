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
      v-if="editable"
      class="p-s bg-info color-bg mb"
    >
      Besoin d'aide pour remplir ce rapport ? Appelez le 06.61.26.42.89
    </div>

    <EditSections
      :sections="activite.sections"
      :contenu.sync="activite.contenu"
      :editable="editable"
    />

    <div
      v-if="!editable && complete"
      id="cmn-titre-activite-edit-popup-warning"
      class="p-s bg-warning color-bg bold mb"
    >
      Une fois validé ce formulaire ne sera plus modifiable.
    </div>

    <template slot="footer">
      <div
        v-if="editable"
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
            id="cmn-titre-activite-edit-popup-button-modifier"
            class="btn-border rnd-xs p-s full-x"
            @click="edit"
          >
            Modifier
          </button>
        </div>
        <div class="mb tablet-blob-1-3 tablet-mb-0">
          <button
            v-if="!loading"
            id="cmn-titre-activite-edit-popup-button-enregistrer"
            class="rnd-xs p-s full-x"
            :class="{ 'btn-flash': !complete, 'btn-border': complete }"
            @click="save(false)"
          >
            Enregistrer
          </button>
          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
        </div>
        <div
          class="tablet-blob-1-3"
          :class="{ disabled: !complete }"
        >
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="complete && save(true)"
          >
            Valider
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import EditSections from './edit-sections.vue'

export default {
  name: 'CaminoTitreActivitesRapportEditPopup',

  components: {
    Popup,
    EditSections
  },

  props: {
    activite: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      editable: true,
      checkboxesValues: []
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
      return this.activite.sections.reduce(
        (activiteComplete, s) =>
          s.elements.reduce((sectionComplete, e) => {
            const value =
              this.activite.contenu[s.id] &&
              (e.type === 'checkboxes'
                ? this.activite.contenu[s.id][e.id].length || null
                : this.activite.contenu[s.id][e.id])

            return sectionComplete && !!(value || value === 0 || e.optionel)
          }, activiteComplete),
        true
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    preview() {
      this.editable = false
    },

    edit() {
      this.errorsRemove()
      this.editable = true
    },

    async save(confirmation) {
      if (confirmation && this.complete) {
        this.activite.statut.id = 'dep'
      } else {
        this.activite.statut.id = 'enc'
      }

      this.errorsRemove()
      await this.$store.dispatch('titreActivites/update', this.activite)
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        if (this.editable) {
          this.cancel()
        } else {
          this.edit()
        }
      } else if ((e.which || e.keyCode) === 13) {
        if (this.editable) {
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

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
