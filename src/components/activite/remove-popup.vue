<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h6>
          <span class="cap-first"> {{ typeNom }} </span
          ><span class="color-neutral"> | </span
          ><span class="cap-first">
            {{ periodeNom }}
          </span>
        </h6>
        <h2 class="cap-first">Suppression de l'activité</h2>
      </div>
    </template>

    <p class="bold">
      Souhaitez vous supprimer l'activité :<br />
      <span class="color-inverse cap-first">{{ typeNom }}</span> |
      <span class="color-inverse">{{ periodeNom }} {{ annee }}</span>
      ?
    </p>
    <div class="bg-warning color-bg p-s mb-l">
      <span class="bold"> Attention </span>: cette opération est définitive et
      ne peut pas être annulée.
    </div>

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button class="btn-flash rnd-xs p-s full-x" @click="remove">
            Supprimer
          </button>
        </div>
      </div>
      <div v-else class="p-s full-x bold">Suppression en cours…</div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../_ui/popup.vue'

export default {
  name: 'CaminoTitreActiviteRemovePopup',

  components: {
    Popup
  },

  props: {
    activiteId: { type: String, required: true },
    typeNom: { type: String, required: true },
    periodeNom: { type: String, required: true },
    annee: { type: Number, required: true },
    context: { type: Object, required: true }
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

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async remove() {
      await this.$store.dispatch('titreActivite/remove', {
        id: this.activiteId,
        context: this.context
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    },

    errorsRemove() {
      // this.$store.commit('utilisateur/loginMessagesRemove')
    }
  }
}
</script>
