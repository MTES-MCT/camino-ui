<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h2 class="mb-0">Création d'une entreprise</h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pays</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select v-model="entreprise.paysId" class="p-s mr" :disabled="true">
          <option v-for="pay in pays" :key="pay.id" :value="pay.id">
            {{ pay.nom }}
          </option>
        </select>
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Siren</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <div>
          <input
            v-model="entreprise.legalSiren"
            type="text"
            class="p-s"
            placeholder="123456789"
          />
        </div>
      </div>
    </div>

    <template slot="footer">
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
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
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoEntrepriseEditPopup',

  components: {
    Popup
  },

  data() {
    return {
      entreprise: { legalSiren: '', paysId: 'fr' },
      pays: [{ id: 'fr', nom: 'France' }]
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
      return this.sirenValide && this.entreprise.paysId
    },

    sirenValide() {
      return (
        this.entreprise.legalSiren &&
        this.entreprise.legalSiren.match('[0-9]{9}$')
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
    this.current = null
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      if (this.complete) {
        await this.$store.dispatch('entreprise/add', this.entreprise)
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
          this.save()
        }
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
