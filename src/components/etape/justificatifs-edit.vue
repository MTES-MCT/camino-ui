<template>
  <div v-if="entreprises.length">
    <div
      v-for="(e, eId) in entreprisesJustificatifsIndex"
      :key="eId"
      class="mb-xl"
    >
      <div class="flex">
        <h4>{{ e.nom }}</h4>

        <button
          class="btn-alt rnd-xs py-s px-m flex-right mt--s mb-xs hide"
          tag="button"
          @click="
            $router.push({
              name: 'entreprise',
              params: { id: eId }
            })
          "
        >
          <i class="icon-24 icon-window-link" />
        </button>
      </div>

      <hr />

      <div
        v-for="(j, index) in e.justificatifs"
        :key="index"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-3">
          <h5>{{ j.type.nom }}</h5>
        </div>
        <div class="tablet-blob-2-3">
          <div v-if="j.documents.length" class="flex mb-s">
            <select
              class="p-s"
              :class="{
                'mr-s':
                  j.type.optionnel ||
                  documentsWithSameType(j.type.id, e.justificatifs)
              }"
              :value="j.id"
              @change="justificatifsUpdate(j, $event)"
            >
              <option
                v-for="d in j.documents"
                :key="d.id"
                :value="d.id"
                :disabled="justificatifs.some(j => j.id === d.id)"
              >
                {{ d.type.nom }} : {{ d.description }} ({{
                  dateFormat(d.date)
                }})
              </option>
            </select>

            <button
              v-if="
                j.type.optionnel ||
                documentsWithSameType(j.type.id, e.justificatifs)
              "
              class="btn py-s px-m rnd-xs"
              @click="justificatifRemove(eId, index)"
            >
              <i class="icon-24 icon-minus" />
            </button>
          </div>
          <div v-else class="h5 italic">
            Cette entreprise n'a aucun document de ce type.
          </div>
        </div>
      </div>

      <div>
        <div class="blobs-mini">
          <div class="blob-mini-1-3">
            <select v-model="newJustificatifTypeIdIndex[eId]" class="p-s mb-s">
              <option
                v-for="jt in justificatifsTypes"
                :key="jt.id"
                :value="jt.id"
              >
                {{ jt.nom }}
              </option>
            </select>
          </div>

          <div class="blob-mini-2-3">
            <button
              class="btn small py-s px-m mb-s full-x rnd-xs flex"
              :class="{ disabled: !newJustificatifTypeIdIndex[eId] }"
              :disabled="!newJustificatifTypeIdIndex[eId]"
              @click="justificatifAdd(eId)"
            >
              <span class="mt-xxs">Ajouter un document</span>
              <i class="icon-24 icon-plus flex-right" />
            </button>
          </div>
        </div>

        <hr />
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
    justificatifs: { type: Array, required: true },
    justificatifsTypes: { type: Array, required: true },
    entreprises: { type: Array, required: true }
  },

  emits: ['complete-update'],

  data() {
    return {
      entreprisesJustificatifsIndex: {},
      entreprisesDocumentsIndex: {},
      newJustificatifTypeIdIndex: {}
    }
  },

  computed: {
    justificatifsTypesIds() {
      return this.justificatifsTypes.map(({ id }) => id)
    },

    complete() {
      const justificatifs = []

      this.entreprises.forEach(entreprise => {
        entreprise.documents.forEach(document => {
          if (this.justificatifs.some(({ id }) => id === document.id)) {
            justificatifs.push(document)
          }
        })
      })

      return this.justificatifsTypes.every(
        jt =>
          jt.optionnel || justificatifs.find(({ type }) => type.id === jt.id)
      )
    }
  },

  watch: {
    complete: 'completeUpdate',

    entreprises: { handler: 'init', deep: true },

    justificatifsTypes: { handler: 'init', deep: true }
  },

  created() {
    this.init()

    this.completeUpdate()
  },

  methods: {
    init() {
      this.entreprisesJustificatifsIndex = {}

      this.entreprises.forEach(e => {
        // { 'id-de-entreprise': {'cv': [{id: 'id-document-1', type: {id: 'cv'}}]}
        this.entreprisesDocumentsIndex[e.id] = {}

        //  { 'entreprise-id': {
        //    nom: "nom de l'entreprise",
        //    justificatifs: [{ id: 'id-du-document-selectionné', documents: [], type: { id: 'document-type-id' } }]
        //  }}
        this.entreprisesJustificatifsIndex[e.id] = {
          nom: e.nom,
          justificatifs: []
        }

        this.justificatifsTypes.forEach(type => {
          const documents = e.documents.filter(d => d.type.id === type.id)
          const documentsIds = documents.map(({ id }) => id)
          this.entreprisesDocumentsIndex[e.id][type.id] = documents

          const justificatifs = this.justificatifs.filter(j =>
            documentsIds.includes(j.id)
          )

          if (justificatifs.length) {
            justificatifs.forEach(j => {
              this.entreprisesJustificatifsIndex[e.id].justificatifs.push({
                id: j.id,
                type,
                documents
              })
            })
          } else if (!type.optionnel) {
            this.entreprisesJustificatifsIndex[e.id].justificatifs.push({
              id: '',
              type,
              documents
            })
          }
        })
      })

      this.justificatifsReset()
    },

    justificatifAdd(entrepriseId) {
      const typeId = this.newJustificatifTypeIdIndex[entrepriseId]
      const type = this.justificatifsTypes.find(jt => jt.id === typeId)
      const documents = this.entreprisesDocumentsIndex[entrepriseId][typeId]

      this.entreprisesJustificatifsIndex[entrepriseId].justificatifs.push({
        id: '',
        type,
        documents
      })

      this.newJustificatifTypeIdIndex[entrepriseId] = null
    },

    dateFormat(date) {
      return dateFormat(date)
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    justificatifsUpdate(justificatif, event) {
      justificatif.id = event.target.value
      this.justificatifsReset()
    },

    justificatifRemove(entrepriseId, index) {
      this.entreprisesJustificatifsIndex[entrepriseId].justificatifs.splice(
        index,
        1
      )

      this.justificatifsReset()
    },

    justificatifsReset() {
      this.justificatifs.splice(0, this.justificatifs.length)

      Object.keys(this.entreprisesJustificatifsIndex).forEach(eId => {
        this.entreprisesJustificatifsIndex[eId].justificatifs.forEach(
          ({ id }) => {
            if (!id) return

            this.justificatifs.push({ id })
          }
        )
      })
    },

    documentsWithSameType(typeId, justificatifs) {
      return justificatifs.filter(j => j.type.id === typeId).length > 1
    }
  }
}
</script>