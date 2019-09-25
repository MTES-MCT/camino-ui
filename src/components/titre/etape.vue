<template>
  <Accordion
    class="mb"
    :sub="true"
  >
    <template slot="section">
      {{ etape.date | dateFormat }}
      <span
        v-if="etape.incertitudes && etape.incertitudes.date"
        class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
      >?</span>
    </template>
    <template slot="title">
      <Dot :color="`bg-${etape.statut.couleur}`" />
      <span class="cap-first">
        {{ etape.type.nom }}
      </span>
    </template>

    <template
      v-if="permissionsCheck(['super'])"
      slot="buttons"
    >
      <button
        class="btn-alt py-s px-m"
        @click="removePopupOpen"
      >
        <i class="icon-24 icon-trash" />
      </button>

      <button
        class="btn-alt py-s px-m"
        @click="editPopupOpen"
      >
        <i class="icon-24 icon-pencil" />
      </button>
    </template>

    <template
      v-if="hasSub"
      slot="sub"
    >
      <div
        v-if="etape.duree"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Durée
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            <span v-if="duree.ans">{{ `${duree.ans} an${duree.ans > 1 ? 's' : ''}` }}</span><span v-if="duree.ans && duree.mois"> et </span>
            <span v-if="duree.mois">{{ `${duree.mois} mois` }}</span>
            <span
              v-if="etape.incertitudes && etape.incertitudes.duree"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.dateDebut"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Date de début
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            {{ etape.dateDebut | dateFormat }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.dateDebut"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.dateFin"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Date d'échéance
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            {{ etape.dateFin | dateFormat }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.dateFin"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.points.length"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Périmètre
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            –
            <span
              v-if="etape.incertitudes && etape.incertitudes.points"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.titulaires.length"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Titulaire{{ etape.titulaires.length > 1 ? 's' : '' }}
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <ul class="list-prefix mb">
            <li
              v-for="t in etape.titulaires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
              <span
                v-if="etape.incertitudes && etape.incertitudes.titulaires"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="etape.amodiataires.length"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Amodiataire{{ etape.amodiataires.length > 1 ? 's' : '' }}
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <ul class="list-prefix">
            <li
              v-for="t in etape.amodiataires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
              <span
                v-if="etape.incertitudes && etape.incertitudes.amodiataires"
                class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
              >?</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="etape.engagement"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Engagement financier
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            {{ numberFormat(etape.engagement) }}
            <span v-if="etape.engagementDevise"> {{ etape.engagementDevise.id }}</span>
            <span
              v-if="etape.incertitudes && etape.incertitudes.engagement"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.volume"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4">
          <h6>
            Volume
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <p>
            {{ numberFormat(etape.volume) }}
            <span v-if="etape.volumeUnite"> {{ etape.volumeUnite.symbole }}</span>
            <span
              v-if="etape.incertitudes && etape.incertitudes.volume"
              class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
            >?</span>
          </p>
        </div>
      </div>
      <div
        v-if="etape.substances.length"
        class="tablet-blobs"
      >
        <div class="tablet-blob-1-4 large-blob-1-4">
          <h6>
            Substance{{ etape.substances.length > 1 ? 's' : '' }}
          </h6>
        </div>
        <div class="tablet-blob-3-4">
          <PillList :elements="etape.substances.map(s => s.nom)" />
          <span
            v-if="etape.incertitudes && etape.incertitudes.substances"
            class="h6 bold bg-info py-xxs px-xs rnd-xs ml-xs color-bg align-y-bottom"
          >?</span>
        </div>
      </div>

      <div
        v-if="incertitudesLength"
      >
        <p class="h5">
          <span
            class="bg-info py-xxs px-xs rnd-xs color-bg bold"
          >?</span>&nbsp;: Donnée incertaine
        </p>
      </div>
    </template>

    <Documents
      v-if="etape.documents.length"
      :documents="etape.documents"
      class="px-m"
    />

    <div
      v-if="etape.visas && etape.visas.length"
      class="px-m"
    >
      <h6>Visas</h6>
      <ul class="list-prefix h5">
        <li
          v-for="(visa, i) in etape.visas"
          :key="i"
        >
          {{ visa }}
        </li>
      </ul>
    </div>
  </Accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from './documents.vue'
import EditPopup from './etape-edit-popup.vue'
import RemovePopup from './etape-remove-popup.vue'

import { jsonTypenameOmit } from '../../utils/index'

export default {
  name: 'CaminoTitreEtape',

  components: {
    Dot,
    Accordion,
    Documents,
    PillList
  },

  props: {
    etape: {
      type: Object,
      default: () => {}
    },

    demarcheType: {
      type: Object,
      default: () => {}
    },

    demarcheId: {
      type: String,
      default: ''
    }
  },

  computed: {
    etapeType() {
      return (
        this.demarcheType.etapesTypes.find(et => et.id === this.etape.typeId) ||
        {}
      )
    },

    incertitudesLength() {
      return (
        this.etape.incertitudes &&
        Object.keys(this.etape.incertitudes).reduce((res, i) => {
          if (this.etape.incertitudes[i] && i !== '__typename') {
            res++
          }
          return res
        }, 0)
      )
    },

    hasSub() {
      return (
        !!this.etape.duree ||
        !!this.etape.dateDebut ||
        !!this.etape.dateFin ||
        !!this.etape.points.length ||
        !!this.etape.substances.length ||
        !!this.etape.titulaires.length ||
        !!this.etape.amodiataires.length
      )
    },

    duree() {
      return {
        ans: this.etape.duree && Math.floor(this.etape.duree / 12),
        mois: this.etape.duree && Math.floor(this.etape.duree % 12)
      }
    }
  },

  methods: {
    editPopupOpen() {
      const etape = jsonTypenameOmit(this.etape)

      etape.titreDemarcheId = this.demarcheId

      etape.typeId = etape.type.id
      delete etape.type

      etape.statutId = etape.statut.id
      delete etape.statut

      const joinTable = [
        'titulaires',
        'amodiataires',
        'administrations',
        'substances'
      ]

      joinTable.forEach(prop => {
        etape[`${prop}Ids`] = etape[prop]
          ? etape[prop].reduce((r, { id }) => (id ? [...r, id] : r), [])
          : []

        delete etape[prop]
      })

      if (etape.date) {
        etape.date = this.dateFormat(etape.date)
      }

      if (etape.dateDebut) {
        etape.dateDebut = this.dateFormat(etape.dateDebut)
      }

      if (etape.dateFin) {
        etape.dateFin = this.dateFormat(etape.dateFin)
      }

      etape.duree = {
        ans: this.etape.duree ? Math.floor(this.etape.duree / 12) : null,
        mois: this.etape.duree ? Math.floor(this.etape.duree % 12) : null
      }

      etape.visas = etape.visas
        ? etape.visas.map((texte, id) => ({
            id,
            texte
          }))
        : []

      etape.engagementDeviseId =
        etape.engagementDevise && etape.engagementDevise.id
      delete etape.engagementDevise

      etape.volumeUniteId = etape.volumeUnite && etape.volumeUnite.id
      delete etape.volumeUnite

      if (etape.points) {
        if (
          etape.points.length &&
          etape.points[0].references.length > 1 &&
          etape.points[0].references.find(r => r.opposable)
        ) {
          etape.geoSystemeOpposableId = etape.points[0].references.find(
            r => r.opposable
          ).geoSysteme.id
        }

        const { groupes, geoSystemeIds } = etape.points.reduce(
          ({ groupes, geoSystemeIds }, point) => {
            const { references, pointGeoSystemeIds } = point.references.reduce(
              ({ pointGeoSystemeIds, references }, r) => {
                pointGeoSystemeIds[r.geoSysteme.id] = true
                r.geoSystemeId = r.geoSysteme.id
                delete r.geoSysteme
                delete r.id
                references.push(r)

                return { pointGeoSystemeIds, references }
              },
              { pointGeoSystemeIds: {}, references: [] }
            )

            groupes[point.groupe - 1] = groupes[point.groupe - 1] || []
            groupes[point.groupe - 1][point.contour - 1] =
              groupes[point.groupe - 1][point.contour - 1] || []
            groupes[point.groupe - 1][point.contour - 1][point.point - 1] = {
              nom: point.nom,
              groupe: point.groupe,
              contour: point.contour,
              point: point.point,
              description: point.description,
              references
            }

            return {
              groupes,
              geoSystemeIds: Object.assign(geoSystemeIds, pointGeoSystemeIds)
            }
          },
          { groupes: [], geoSystemeIds: {} }
        )

        etape.groupes = groupes
        etape.geoSystemeIds = Object.keys(geoSystemeIds)

        delete etape.points
      }

      if (!etape.incertitudes) {
        etape.incertitudes = {}
      }

      if (!etape.contenu) {
        etape.contenu = {}
      }

      delete etape.pays
      delete etape.points
      delete etape.geojsonPoints
      delete etape.geojsonMultiPolygon
      delete etape.documents

      console.log(JSON.stringify(etape, null, 2))

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          etape,
          domaineId: this.$store.state.titre.current.domaine.id,
          demarcheType: this.demarcheType,
          titreNom: this.$store.state.titre.current.nom
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          etapeTypeNom: this.etape.type.nom,
          etapeId: this.etape.id,
          demarcheTypeNom: this.demarcheType.nom,
          titreNom: this.$store.state.titre.current.nom,
          titreType: this.$store.state.titre.current.type.nom
        }
      })
    },

    etablissementNameFind(etablissements, date) {
      const etablissement = etablissements.find(
        e =>
          (this.dateFormat(e.dateDebut) < this.dateFormat(date) &&
            (!e.dateFin ||
              this.dateFormat(e.dateFin) > this.dateFormat(date))) ||
          !e.dateDebut
      )

      return etablissement && etablissement.nom
    }
  }
}
</script>
