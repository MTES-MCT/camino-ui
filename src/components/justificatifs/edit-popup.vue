<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h5 class="cap-first">
          {{ title }}
        </h5>
        <h2 class="cap-first mb-0">
          Association de justificatifs d'entreprise
        </h2>
      </div>
    </template>

    <div v-if="entreprises.length">
      <div v-for="entreprise in entreprises" :key="entreprise.id" class="mb-xl">
        <div class="flex">
          <h4>{{ entreprise.nom }}</h4>

          <button
            class="btn-alt rnd-xs py-s px-m flex-right mt--s mb-xs"
            tag="button"
            @click="routerPush(entreprise.id)"
          >
            <i class="icon-24 icon-window-link" />
          </button>
        </div>

        <hr />

        <div
          v-if="entreprise.documents && entreprise.documents.length"
          class="tablet-blobs"
        >
          <div class="tablet-blob-1-3 pb-s">
            <h6>Documents</h6>
          </div>
          <div class="tablet-blob-2-3">
            <ul class="list-sans mb-0">
              <li
                v-for="document in entreprise.documents"
                :key="document.id"
                class="h5"
              >
                <label>
                  <input
                    v-model="documents.ids"
                    type="checkbox"
                    class="mr-s"
                    :value="document.id"
                  /><span class="bold">{{ document.type.nom }}</span> ({{
                    dateFormat(document.date)
                  }}){{
                    document.description ? ` : ${document.description}` : ''
                  }}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="h5 italic">
          Cette entreprise n'a pas de documents associés.
        </div>
      </div>
    </div>
    <div v-else class="p-s bg-info color-bg mb">
      Il n'y a pas de titulaire ou d'amodiataire associé à cette étape.
    </div>

    <Messages :messages="warnings" />

    <template #footer>
      <div v-if="!loading" class="tablet-blobs">
        <div class="tablet-blob-1-3 mb tablet-mb-0">
          <button class="btn-border rnd-xs p-s full-x" @click="cancel">
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
          <button
            class="btn-flash rnd-xs p-s full-x"
            :disabled="!documentsTotal"
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
import Messages from '../_ui/messages.vue'
import { dateFormat } from '@/utils'

export default {
  name: 'CaminoEtapeJustificatifsPopup',

  components: {
    Popup,
    Messages
  },

  props: {
    context: { type: Object, required: true },
    id: { type: String, required: true },
    title: { type: String, default: '' },
    documents: { type: Object, required: true }
  },

  data() {
    return {
      warnings: []
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    entreprises() {
      return this.$store.state.titreEtapeJustificatifs.metas.entreprises
    },

    documentsTotal() {
      return this.entreprises.reduce((total, e) => {
        if (e.documents) {
          total += e.documents.length
        }

        return total
      }, 0)
    }
  },

  created() {
    this.get()
    document.addEventListener('keyup', this.keyUp)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyUp)
  },

  methods: {
    async get() {
      await this.$store.dispatch('titreEtapeJustificatifs/metasGet', this.id)
    },

    async save() {
      await this.$store.dispatch('titreEtapeJustificatifs/link', {
        id: this.id,
        documentsIds: this.documents.ids,
        context: this.context
      })
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyUp(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    routerPush(id) {
      this.$store.commit('popupClose')
      this.$router.push({
        name: 'entreprise',
        params: { id }
      })
    },

    errorsRemove() {},

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
