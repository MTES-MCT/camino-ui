<template>
  {{ message }}
  <div v-if="entreprisesFiltered.length">
    <div
      v-for="entreprise in entreprisesFiltered"
      :key="entreprise.id"
      class="mb-xl"
    >
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
          <h5>Documents</h5>
        </div>
        <div class="tablet-blob-2-3">
          <ul class="list-sans mb-0">
            <li
              v-for="document in entreprise.documents"
              :key="document.id"
              class="h6"
            >
              <label>
                <input
                  v-model="etape.justificatifs"
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
      <div v-else class="h6 italic">
        Cette entreprise n'a pas de documents associés.
      </div>
    </div>
  </div>
  <div v-else>
    Il n'y a pas de titulaire ou d'amodiataire associé à cette étape.
  </div>
</template>

<script>
import { dateFormat } from '@/utils'

export default {
  props: {
    etape: { type: Object, required: true },
    justificatifsTypes: { type: Array, required: true }
  },
  emits: ['complete-update'],

  computed: {
    entreprisesFiltered() {
      const justificatifsTypesIds = this.justificatifsTypes.map(({ id }) => id)

      return this.etape.titulaires
        .concat(this.etape.amodiataires)
        .filter(t => t.id)
        .map(({ id }) => {
          let entreprise = this.$store.state.titreEtape.metas.entreprises.find(
            e => e.id === id
          )
          entreprise = JSON.parse(JSON.stringify(entreprise))
          // on garde que les types de docs qui peuvent être associés en tant que justificatif pour ce type d’étape
          entreprise.documents = entreprise.documents
            .filter(document =>
              justificatifsTypesIds.includes(document.type.id)
            )
            .sort(
              (a, b) =>
                this.justificatifsTypes.find(jt => jt.id === a.type.id)
                  .optionnel -
                this.justificatifsTypes.find(jt => jt.id === b.type.id)
                  .optionnel
            )

          return entreprise
        })
    },

    justificatifsSelected() {
      const justificatifs = []

      this.entreprisesFiltered.forEach(entreprise => {
        entreprise.documents.forEach(document => {
          if (this.etape.justificatifs.includes(document.id)) {
            justificatifs.push(document)
          }
        })
      })

      return justificatifs
    },

    complete() {
      return this.justificatifsTypes.every(
        jt =>
          jt.optionnel ||
          this.justificatifsSelected.find(({ type }) => type.id === jt.id)
      )
    },

    message() {
      if (this.complete) {
        return ''
      }

      return `Les justificatifs suivants sont obligatoires : ${this.justificatifsTypes
        .filter(({ optionnel }) => !optionnel)
        .map(({ nom }) => nom)}`
    }
  },

  watch: {
    complete: {
      handler: function (complete) {
        this.$emit('complete-update', complete)
      },
      immediate: true
    },

    justificatifsSelected: {
      handler: 'reset',
      deep: true,
      immediate: true
    }
  },

  methods: {
    reset() {
      const justificatifsSelectedIds = this.justificatifsSelected.map(
        ({ id }) => id
      )

      this.etape.justificatifs.forEach(documentId => {
        if (!justificatifsSelectedIds.includes(documentId)) {
          const index = this.etape.justificatifs.findIndex(
            id => id === documentId
          )

          if (index > -1) {
            this.etape.justificatifs.splice(index, 1)
          }
        }
      })
    },

    dateFormat(date) {
      return dateFormat(date)
    }
  }
}
</script>
