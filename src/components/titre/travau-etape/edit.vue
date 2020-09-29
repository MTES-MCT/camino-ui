<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first"> {{ titreNom }} </span
          ><span class="color-neutral"> | </span
          ><span class="cap-first">
            {{ travauxType.nom }}
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
        <select v-model="etape.typeId" class="p-s" @change="typeUpdate">
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

    <hr />

    <div v-if="etape.typeId">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Statut</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="etape.statutId" class="p-s">
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
      <hr />
    </div>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date</h6>
      </div>
      <div class="tablet-blob-2-3">
        <InputDate
          v-model="etape.date"
          :class="{ 'mb-s': etape.date, mb: !etape.date }"
        />
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Durée (années / mois)</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="tablet-blob-2-3">
        <div
          class="tablet-blobs"
          :class="{ 'mb-s': !etape.duree.ans && !etape.duree.mois }"
        >
          <div class="tablet-blob-1-2">
            <inputNumber
              v-model.number="etape.duree.ans"
              min="0"
              placeholder="années"
              class="p-s mb-s"
            />
          </div>
          <div class="tablet-blob-1-2">
            <inputNumber
              v-model.number="etape.duree.mois"
              min="0"
              placeholder="mois"
              class="p-s"
            />
          </div>
        </div>
      </div>
    </div>

    <hr />

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Surface (Km²)</h6>
        <p class="h6 italic mb-0">Optionnel</p>
      </div>
      <div class="tablet-blob-2-3">
        <inputNumber
          v-model.number="etape.surface"
          class="p-s"
          min="0"
          placeholder="0"
          :class="{ 'mb-s': etape.surface, mb: !etape.surface }"
        />
      </div>
    </div>

    <EditSections
      v-if="etapeType.sections"
      :sections="etapeType.sections"
      :element.sync="etape"
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
        <div class="tablet-blob-2-3" :class="{ disabled: !complete }">
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>

          <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import InputDate from '../../_ui/input-date.vue'
import InputNumber from '../../_ui/input-number.vue'
import Popup from '../../_ui/popup.vue'
import EditSections from '../../_common/edit-sections.vue'

import { etapeSaveFormat } from './edit'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    EditSections,
    InputDate,
    InputNumber
  },

  props: {
    etape: { type: Object, default: () => ({}) },
    travauxType: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' },
    titreNom: { type: String, default: '' },
    creation: { type: Boolean, default: false }
  },

  data() {
    return {
      events: { saveKeyUp: true }
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
      return this.$store.state.titreTravauxEtape.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    etapeType() {
      return this.etapeTypes.find(et => et.id === this.etape.typeId) || {}
    },

    etapesStatuts() {
      return this.etapeType.etapesStatuts
    },

    complete() {
      return this.etape.typeId && this.etape.date && this.etape.statutId
    }
  },

  async created() {
    await this.metasGet()
    document.addEventListener('keyup', this.keyUp)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async metasGet() {
      await this.$store.dispatch('titreTravauxEtape/metasGet', this.etape)
    },

    async save() {
      if (this.complete) {
        const etape = etapeSaveFormat(this.etape)

        if (!this.etape.contenu) {
          delete this.etape.contenu
        }

        if (this.creation) {
          await this.$store.dispatch('titreTravauxEtape/add', etape)
        } else {
          await this.$store.dispatch('titreTravauxEtape/update', etape)
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
