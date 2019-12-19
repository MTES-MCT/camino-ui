<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first"> {{ titreNom }} </span><span class="color-neutral"> | </span><span class="cap-first">
            {{ demarcheType.nom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ creation ? "Ajout d'une " : "Modification de l'" }}étape
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Type</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select
          v-model="etape.typeId"
          class="p-s"
          @change="typeUpdate"
        >
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

    <hr>

    <div v-if="etape.typeId">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Statut</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="etape.statutId"
            class="p-s"
          >
            <option
              v-for="etapeStatut in etapesStatuts"
              :key="etapeStatut.id"
              :value="etapeStatut.id"
              :disabled="etape.statutId === etapeStatut.id"
            >
              {{ etapeStatut.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr>
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date</h6>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model="etape.date"
          type="date"
          class="p-s"
          :class="{ 'mb-s': etape.date, mb: !etape.date }"
          placeholder="aaaa-mm-jj"
        >
        <label
          v-if="etape.date"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.date"
            type="checkbox"
          >donnée
          incertaine
        </label>
      </div>
    </div>

    <hr>

    <EtapeEditFondamentales
      v-if="etapeType.fondamentale"
      :etape.sync="etape"
      :domaine-id="domaineId"
    />

    <EtapeEditPoints
      v-if="etapeType.fondamentale"
      :etape.sync="etape"
      :events.sync="events"
    />

    <EditSections
      v-if="etapeType.sections"
      :sections="etapeType.sections"
      :contenu.sync="contenu"
    />

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
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
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../../_ui/popup.vue'
import EtapeEditFondamentales from './edit-fondamentales.vue'
import EtapeEditPoints from './edit-points.vue'
import EditSections from '../../_common/edit-sections.vue'

import { etapeSaveFormat } from './edit'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    EtapeEditFondamentales,
    EtapeEditPoints,
    EditSections
  },

  props: {
    etape: { type: Object, default: () => ({}) },
    demarcheType: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    creation: { type: Boolean, default: false },
    etapesTypeIds: { type: Array, default: () => [] }
  },

  data() {
    return {
      events: {
        saveKeyUp: true
      }
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    etapeTypes() {
      return this.$store.state.metas.etape.demarcheEtapesTypes
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId) || {}
    },

    etapesStatuts() {
      return this.etapeType.etapesStatuts
    },

    contenu() {
      return (
        this.etapeType.sections &&
        this.etapeType.sections.reduce(
          (acc, { id }) =>
            Object.assign(acc, {
              [id]: (this.etape.contenu && this.etape.contenu[id]) || {}
            }),
          {}
        )
      )
    },

    complete() {
      return this.etape.typeId && this.etape.date && this.etape.statutId
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      await this.$store.dispatch('metas/titreEtapeGet', this.etape)
    },

    async save() {
      if (this.complete) {
        const etape = etapeSaveFormat(this.etape)

        etape.contenu = this.contenu

        // console.log(JSON.stringify(etape, null, 2))
        if (this.creation) {
          await this.$store.dispatch('titre/etapeAdd', etape)
        } else {
          await this.$store.dispatch('titre/etapeUpdate', etape)
        }
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13 && this.events.saveKeyUp) {
        this.save()
      }
    },

    typeUpdate() {
      if (this.etapesStatuts.length === 1) {
        this.etape.statutId = this.etapesStatuts[0].id
      } else {
        this.etape.statutId = null
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
