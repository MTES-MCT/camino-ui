<template>
  <Popup :messages="messages">
    <template #header>
      <div>
        <h2 class="cap-first">Ajout d’une nouvelle méta</h2>
      </div>
    </template>

    <div class="blobs">
      <MetaInput
        v-for="colonne of colonnesToEdit"
        :key="colonne.id"
        v-model:element="element"
        :colonne="colonne"
        class="blob-1-4"
      >
        {{ colonne.nom }}
      </MetaInput>
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
            class="btn-primary rnd-xs p-s full-x"
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

<script lang="ts">
import Popup from '../_ui/popup.vue'

import { defineComponent } from 'vue'
import metasIndex from '@/store/metas-definitions'
import MetaInput from './meta-input.vue'

export default defineComponent({
  name: 'CaminoMetaCreatePopup',

  components: {
    Popup,
    MetaInput
  },

  props: {
    id: { type: String, required: true },
    foreignKeys: { type: Object, required: true },
    joinTable: { type: String, required: true },
    foreignKey: { type: String, required: true }
  },

  data() {
    return {
      element: {}
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    colonnesToEdit() {
      const keys = Object.keys(this.foreignKeys)

      return metasIndex[this.joinTable].colonnes.filter(
        colonne => !keys.includes(colonne.id)
      )
    },

    complete() {
      return metasIndex[this.joinTable].colonnes.every(
        c => !!this.element[c.id] || c.optional
      )
    }
  },

  created() {
    this.element = { ...this.foreignKeys }
    document.addEventListener('keyup', this.keyup)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      if (this.complete) {
        await this.$store.dispatch('meta/create', {
          id: this.id,
          element: this.element,
          joinTable: this.joinTable,
          foreignKey: this.foreignKey
        })
        this.$store.commit('popupClose')
      }
    },

    cancel() {
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
    }
  }
})
</script>
