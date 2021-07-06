<template>
  <div v-if="entreprises.length">
    <div
      v-for="(e, eId) in entreprisesJustificatifsIndex"
      :key="eId"
      class="mb-xs"
    >
      <div class="flex">
        <h4>{{ e.nom }}</h4>
      </div>

      <hr class="mb-s" />

      <div v-for="(j, index) in e.justificatifs" :key="j.id">
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <h5 class="mt-s">{{ j.type.nom }}</h5>
          </div>
          <div class="tablet-blob-2-3">
            <div class="flex mb-s">
              <select
                class="p-s"
                :value="j.id"
                @change="justificatifsUpdate(j, e.nom, eId, $event)"
              >
                <template v-if="j.documents.length">
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
                </template>
                <option v-else></option>
                <option value="newDocument">
                  Ajouter un nouveau justificatif
                </option>
              </select>

              <button
                class="btn py-s px-m ml-s rnd-xs flex-right"
                @click="justificatifRemove(eId, index)"
              >
                <i class="icon-24 icon-minus" />
              </button>
            </div>
          </div>
        </div>
        <hr class="mb-s" />
      </div>

      <div>
        <div class="tablet-blobs">
          <div class="tablet-blob-1-3">
            <h5 class="mt-s">Ajouter un justificatif existant</h5>
          </div>
          <div class="tablet-blob-2-3">
            <select
              class="p-s mb-s"
              value="undefined"
              @change="justificatifAdd(eId, $event)"
            >
              <option value="undefined" :disabled="true">
                Sélectionner un type de justificatif
              </option>
              <option
                v-for="jt in justificatifsTypes"
                :key="jt.id"
                :value="jt.id"
              >
                {{ jt.nom }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else>Aucun titulaire ou d'amodiataire associé à cette étape.</p>
</template>

<script>
import { dateFormat } from '@/utils'
import DocumentEditPopup from '../document/edit-popup.vue'

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
      entreprisesDocumentsIndex: {}
    }
  },

  computed: {
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
    entreprises: { handler: 'reset', deep: true },
    justificatifsTypes: { handler: 'reset', deep: true },
    justificatifs: { handler: 'indexReset', deep: true }
  },

  created() {
    this.indexReset()

    this.completeUpdate()
  },

  methods: {
    reset() {
      this.indexReset()
      this.justificatifsReset()
    },

    indexReset() {
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
    },

    justificatifAdd(entrepriseId, event) {
      const typeId = event.target.value
      const type = this.justificatifsTypes.find(jt => jt.id === typeId)
      const documents = this.entreprisesDocumentsIndex[entrepriseId][typeId]

      this.entreprisesJustificatifsIndex[entrepriseId].justificatifs.push({
        id: '',
        type,
        documents
      })

      event.target.value = undefined
    },

    dateFormat(date) {
      return dateFormat(date)
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    justificatifsUpdate(justificatif, entrepriseNom, entrepriseId, event) {
      if (event.target.value === 'newDocument') {
        event.target.value = null
        this.$store.commit('popupOpen', {
          component: DocumentEditPopup,
          props: {
            document: {
              entrepriseId,
              entreprisesLecture: true,
              publicLecture: false,
              fichier: null,
              fichierNouveau: null,
              fichierTypeId: null,
              typeId: justificatif.type.id
            },
            action: {
              name: 'titreEtapeEdition/entrepriseDocumentAdd',
              params: { entrepriseId }
            },
            repertoire: 'entreprises',
            title: entrepriseNom
          }
        })
      } else {
        justificatif.id = event.target.value
        this.justificatifsReset()
      }
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
    }
  }
}
</script>
