<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first">{{ titreNom }}</span
          ><span class="color-neutral"> | </span
          ><span class="cap-first">{{ titreTypeNom }} </span>
        </h6>
        <h2 class="cap-first">
          {{ creation ? 'Ajout de' : 'Modification des' }} travaux
        </h2>
      </div>
    </template>
    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h5>Type</h5>
        </div>
        <div class="mb tablet-blob-2-3">
          <select v-model="travaux.typeId" class="p-s mr">
            <option
              v-for="type in types"
              :key="type.id"
              :value="type.id"
              :disabled="travaux.typeId === type.id"
            >
              {{ type.nom }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            ref="save-button"
            :disabled="!complete"
            :class="{ disabled: !complete }"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Enregistrement en cours…</div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoTravauxEditPopup',

  components: {
    Popup
  },

  props: {
    travaux: { type: Object, default: () => ({}) },
    titreNom: { type: String, default: '' },
    titreTypeNom: { type: String, default: '' },
    creation: { type: Boolean, default: false }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    types() {
      return this.$store.state.titreTravaux.metas.types.filter(
        t => t.travauxCreation
      )
    },

    complete() {
      return this.travaux.typeId
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreTravaux/init')
    },

    async save() {
      if (this.complete) {
        const travaux = JSON.parse(JSON.stringify(this.travaux))

        if (this.creation) {
          await this.$store.dispatch('titreTravaux/add', travaux)
        } else {
          await this.$store.dispatch('titreTravaux/update', travaux)
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
        if (this.complete) {
          this.$refs['save-button'].focus()
          this.save()
        }
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
