<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first"><span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ typeNom }}
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
            type="text"
            class="p-s mr"
          >
            <option
              v-for="demarcheType in demarchesTypes"
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
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'

export default {
  name: 'CaminoDemarcheEditPopup',

  components: {
    Popup,
    Messages
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

    typeNom: {
      type: String,
      default: ''
    },

    demarchesTypes: {
      type: Array,
      default: () => []
    },

    creation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    messages() {
      return this.$store.state.popup.messages
    },

    demarcheTypeNom() {
      const demarcheType = this.demarchesTypes.find(
        et => et.id === this.demarche.typeId
      )
      return demarcheType && demarcheType.nom
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save() {
      const demarche = JSON.parse(JSON.stringify(this.demarche))

      if (this.creation) {
        this.$store.dispatch('titre/demarcheCreate', demarche)
      } else {
        this.$store.dispatch('titre/demarcheUpdate', demarche)
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
