<template>
  <Loader v-if="!etape" />
  <div v-else>
    <h6>
      <span class="cap-first"> {{ titreNom }} </span>
      <span class="color-neutral"> | </span>
      <span class="cap-first">
        {{ demarcheType.nom }}
      </span>
    </h6>
    <h2>"Modification de l'étape</h2>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Date</h5>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate
          v-model="etape.date"
          :class="{ 'mb-s': etape.date, mb: !etape.date }"
        />
        <div class="h6">
          <label v-if="etape.date">
            <input v-model="etape.incertitudes.date" type="checkbox" />
            Incertain
          </label>
        </div>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h5>Type</h5>
      </div>
      <div class="mb tablet-blob-2-3">
        <select :value="etape.typeId" class="p-s" @change="typeUpdate($event)">
          <option
            v-for="eType in etapeTypes"
            :key="eType.id"
            :value="eType.id"
            :disabled="etape.typeId === eType.id"
          >
            {{ eType.nom }}
          </option>
        </select>
      </div>
    </div>

    <Edit
      v-if="heritageLoaded"
      v-model:etape="etape"
      :etape-types="etapeTypes"
      :domaine-id="domaineId"
      :events="events"
      @edit-complete-update="editCompleteUpdate"
    />

    <div v-if="!loading" class="tablet-blobs">
      <div class="tablet-blob-1-3 mb tablet-mb-0"></div>
      <div class="tablet-blob-2-3">
        <button
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
    <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
  </div>
</template>

<script>
import InputDate from './_ui/input-date.vue'
import Edit from './etape/edit.vue'

export default {
  components: {
    InputDate,
    Edit
  },

  // props: {
  //   etapeId: { type: String, default: null },
  //   demarcheId: { type: String, required: true },
  //   demarcheType: { type: Object, default: () => ({}) },
  //   domaineId: { type: String, default: '' },
  //   titreNom: { type: String, default: '' }
  // },

  data() {
    return {
      events: { saveKeyUp: true },
      editComplete: false
    }
  },

  computed: {
    etapeTypes() {
      return this.$store.state.titreEtape.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    etape() {
      return this.$store.state.titreEtape.element
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId)
    },

    documentsTypes() {
      return (
        this.etapeType &&
        this.etapeType.documentsTypes.filter(dt => !dt.optionnel)
      )
    },

    complete() {
      return this.etape && this.etape.date && this.editComplete
    }
  },

  async created() {
    document.addEventListener('keyup', this.keyUp)

    await this.init()
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
        id: this.$route.params.id
      })
    },

    async save() {
      if (this.complete) {
        await this.$store.dispatch('titreEtape/upsert', this.etape)

        this.eventTrack({
          categorie: 'titre-sections',
          action: 'titre-etape-enregistrer',
          nom: this.etape.id
        })
      }
    },

    keyUp(e) {
      if (
        (e.which || e.keyCode) === 13 &&
        this.events.saveKeyUp &&
        this.complete
      ) {
        this.$refs['save-button'].focus()
        this.save()
      }
    },

    eventTrack(event) {
      if (this.$matomo) {
        this.$matomo.trackEvent(event.categorie, event.action, event.nom)
      }
    },

    editCompleteUpdate(complete) {
      this.editComplete = complete
    },

    async typeUpdate(event) {
      const typeId = event.target.value

      this.heritageLoaded = false

      await this.$store.dispatch('titreEtape/heritageGet', {
        titreDemarcheId: this.demarcheId,
        typeId,
        date: this.newDate
      })

      this.heritageLoaded = true

      if (this.etapesStatuts?.length === 1) {
        this.etape.statutId = this.etapesStatuts[0].id
      } else {
        this.etape.statutId = null
      }
    }
  }
}
</script>
