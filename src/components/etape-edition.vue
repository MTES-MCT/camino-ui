<template>
  <Loader v-if="!loaded" />
  <div v-else>
    <h6>
      <span class="cap-first"> {{ titre.nom }} </span>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ demarcheType.nom }}
      </span>
    </h6>
    <h1>Modification de l'étape</h1>

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
      :etape="etape"
      :user="user"
      :modifiable="modifiable"
      :etape-is-demande="etapeIsDemande"
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

    <div v-else-if="modifiable" class="tablet-blobs mb">
      <div class="tablet-blob-1-3" />
      <div class="tablet-blob-2-3">
        <button
          id="cmn-etape-edit-button-previsualiser"
          ref="preview-button"
          class="btn-flash rnd-xs p-s full-x"
          @click="preview"
        >
          Prévisualiser…
        </button>
      </div>
    </div>

    <div v-else class="tablet-blobs mb">
      <div class="tablet-blob-1-3">
        <button
          ref="modifier-button"
          class="btn-border rnd-xs p-s full-x mb-s"
          @click="edit"
        >
          Modifier…
        </button>
      </div>

      <div class="tablet-blob-2-3">
        <div v-if="etapeIsDemande" class="tablet-blobs">
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
          :class="{ disabled: !complete }"
          @click="save()"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import InputDate from './_ui/input-date.vue'
import Edit from './etape/edit.vue'

export default {
  components: { Loader, Edit, InputDate },

  data() {
    return {
      modifiable: true,
      complete: false,
      typeComplete: false,
      newDate: new Date().toISOString().slice(0, 10)
    }
  },

  computed: {
    loaded() {
      return this.$store.state.titreEtape.loaded
    },

    user() {
      return this.$store.state.user.element
    },

    etapeId() {
      return this.$route.params.id
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    demarche() {
      return this.$store.state.titreEtape.metas.demarche
    },

    dateIsVisible() {
      return !this.etape?.date
    },

    demarcheType() {
      return this.demarche ? this.demarche.type : ''
    },

    titre() {
      return this.demarche ? this.demarche.titre : ''
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
      return this.etape.typeId === 'mfr'
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
    this.$store.commit('titreEtape/reset')
  },

  methods: {
    async init() {
      await this.$store.dispatch('titreEtape/init', {
        titreDemarcheId: this.$route.query['demarche-id'],
        id: this.etapeId,
        date: this.newDate
      })
    },

    async save(depose) {
      if (
        (this.etapeIsDemande && !depose && this.typeComplete) ||
        this.complete
      ) {
        await this.$store.dispatch('titreEtape/upsert', {
          etape: this.etape,
          depose
        })

        this.eventTrack({
          categorie: 'titre-etape',
          action: 'titre-etape-enregistrer',
          nom: this.etape.id
        })
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        if (this.modifiable) {
          this.$refs['modifier-button'].focus()
          this.edit()
        }
      } else if (
        (e.which || e.keyCode) === 13 &&
        this.events.saveKeyUp &&
        this.complete
      ) {
        if (this.dateIsVisible && this.newDate) {
          this.$refs['date-button'].focus()
          this.dateUpdate()
        } else if (this.modifiable) {
          this.preview()
        } else if (!this.loading && this.etapeIsDemande && this.complete) {
          this.$refs['save-depose-button'].focus()
          this.save(true)
        } else if (!this.loading && this.etapeIsDemande && this.typeComplete) {
          this.$refs['en-construction-button'].focus()
          this.save(false)
        } else if (!this.loading && this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    },

    preview() {
      this.modifiable = false
    },

    edit() {
      this.modifiable = true
    },

    completeUpdate(complete) {
      this.complete = complete
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete
    },

    async dateUpdate() {
      await this.$store.dispatch('titreEtape/dateUpdate', {
        date: this.newDate
      })
    }
  }
}
</script>
