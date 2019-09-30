<template>
  <Popup>
    <template slot="header">
      <div>
        <h5>
          <span class="cap-first">
            {{ titreNom }}
          </span><span class="color-neutral">
            |
          </span><span class="cap-first">
            {{ demarcheType.nom }}
          </span>
        </h5>
        <h2 class="cap-first mb-0">
          {{ creation ? 'Ajout' : 'Modification' }} d'une étape
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Type</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select
          v-model="etape.typeId"
          type="text"
          class="p-s"
        >
          <option
            v-for="eType in demarcheType.etapesTypes"
            :key="eType.id"
            :value="eType.id"
            :disabled="etape.typeId === eType.id"
          >
            {{ eType.nom }}
          </option>
        </select>
      </div>
    </div>
    <hr>

    <div v-if="etape.typeId">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Statut</h6>
        </div>
        <div class="mb tablet-blob-2-3">
          <select
            v-model="etape.statutId"
            type="text"
            class="p-s"
          >
            <option
              v-for="etapeStatut in etapesStatuts"
              :key="etapeStatut.id"
              :value="etapeStatut.id"
              :disabled="etape.statutId === etapeStatut.id"
            >
              {{ etapeStatut.nom }}
            </option>
          </select>
        </div>
      </div>
      <hr>
    </div>

    <div>
      <div class="tablet-blobs">
        <div class="tablet-blob-1-3 tablet-pt-s pb-s">
          <h6>Date</h6>
        </div>
        <div class="tablet-blob-2-3">
          <input
            v-model="etape.date"
            type="date"
            class="p-s"
            :class="{'mb-s': etape.date, 'mb': !etape.date}"
            placeholder="aaaa-mm-jj"
          >
          <label
            v-if="etape.date"
            class="h5"
          >
            <input
              v-model="etape.incertitudes.date"
              type="checkbox"
            >donnée incertaine
          </label>
        </div>
      </div>
      <hr>
    </div>

    <EtapeEditFondamentales
      v-if="etapeType.fondamentale"
      :etape.sync="etape"
      :domaine-id="domaineId"
    />

    <EditSections
      v-if="etapeType.sections"
      :sections="etapeType.sections"
      :contenu.sync="contenu"
    />

    <template slot="footer">
      <Messages :messages="messages" />
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
          >
            Annuler
          </button>
        </div>
        <div class="tablet-blob-2-3">
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
import Popup from '../ui/popup.vue'
import Messages from '../ui/messages.vue'
import EtapeEditFondamentales from './etape-edit-fondamentales.vue'

import EditSections from './edit-sections.vue'

export default {
  name: 'CaminoEtapeEditPopup',

  components: {
    Popup,
    Messages,
    EtapeEditFondamentales,
    EditSections
  },

  props: {
    etape: {
      type: Object,
      default: () => ({})
    },

    demarcheType: {
      type: Object,
      default: () => ({})
    },

    domaineId: {
      type: String,
      default: ''
    },

    titreNom: {
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

    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    etapesStatuts() {
      return this.etapeType.etapesStatuts
    },

    contenu() {
      return (
        this.etapeType.sections &&
        this.etapeType.sections.reduce(
          (acc, { id }) =>
            Object.assign(acc, {
              [id]: (this.etape.contenu && this.etape.contenu[id]) || {}
            }),
          {}
        )
      )
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
      const etape = JSON.parse(JSON.stringify(this.etape))

      const propsIds = [
        'substancesIds',
        'titulairesIds',
        'amodiatairesIds',
        'administrationsIds'
      ]

      // supprime les champs dont les ids sont vides
      propsIds.forEach(propId => {
        if (etape[propId]) {
          etape[propId] = etape[propId].filter(id => id)
        }
      })

      if (etape.groupes) {
        etape.points = etape.groupes.reduce((acc, contours, groupeIndex) => {
          const points = contours.reduce((acc, points, contourIndex) => {
            const pointsValides = points.reduce((acc, point, pointIndex) => {
              if (
                point.references.length &&
                point.references.every(r => r.coordonnees.x && r.coordonnees.y)
              ) {
                points.references = point.references.filter(r =>
                  etape.geoSystemeIds.includes(r.geoSystemeId)
                )
                if (point.references.length > 1) {
                  const reference = point.references.find(
                    r => r.geoSystemeId === etape.geoSystemeOpposableId
                  )
                  reference.opposable = true
                }
                point.groupe = groupeIndex + 1
                point.contour = contourIndex + 1
                point.point = pointIndex + 1

                acc.push(point)
              }

              return acc
            }, [])

            acc = acc.concat(pointsValides)

            return acc
          }, [])

          acc = acc.concat(points)

          return acc
        }, [])

        delete etape.groupes
      }

      if (etape.geoSystemeIds) {
        delete etape.geoSystemeIds
      }

      if (etape.geoSystemeOpposableId) {
        delete etape.geoSystemeOpposableId
      }

      if (etape.duree.ans || etape.duree.mois) {
        etape.duree =
          (etape.duree.ans ? etape.duree.ans * 12 : 0) +
          (etape.duree.mois ? etape.duree.mois : 0)
      } else {
        etape.duree = null
      }

      const props = [
        'date',
        'dateDebut',
        'dateFin',
        'surface',
        'duree',
        'volume',
        'volumeUniteId',
        'engagement',
        'engagementDeviseId'
      ]

      props.forEach(prop => {
        if (etape[prop] === '') {
          etape[prop] = null
        }
      })

      etape.contenu = this.contenu

      console.log(JSON.stringify(etape, null, 2))
      if (this.creation) {
        this.$store.dispatch('titre/etapeCreate', etape)
      } else {
        this.$store.dispatch('titre/etapeUpdate', etape)
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
