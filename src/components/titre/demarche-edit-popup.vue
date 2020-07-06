<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first"><span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ titreTypeNom }}
          </span>
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ creation ? 'Ajout d\'une' : 'Modification de la' }} démarche
        </h2>
      </div>
    </template>
    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Type</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="demarche.typeId"
            class="p-s mr"
          >
            <option
              value="null"
              disabled
            >
              sélectionner un type
            </option>
            <option
              v-for="demarcheType in types"
              :key="demarcheType.id"
              :value="demarcheType.id"
              :disabled="demarche.typeId === demarcheType.id"
            >
              {{ demarcheType.nom }}
            </option>
          </select>
        </div>
      </div>
    </div>

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
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup
  },

  props: {
    demarche: {
      type: Object,
      default: () => ({})
    },

    titreNom: {
      type: String,
      default: ''
    },

    titreTypeNom: {
      type: String,
      default: ''
    },

    creation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    types() {
      return this.$store.state.titreDemarche.metas.types.filter(
        t => t.demarchesCreation
      )
    },

    complete() {
      return this.demarche.typeId
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreDemarche/metasGet', this.demarche)
    },

    async save() {
      if (this.complete) {
        const demarche = JSON.parse(JSON.stringify(this.demarche))

        if (this.creation) {
          await this.$store.dispatch('titreDemarche/add', demarche)
        } else {
          await this.$store.dispatch('titreDemarche/update', demarche)
        }
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
