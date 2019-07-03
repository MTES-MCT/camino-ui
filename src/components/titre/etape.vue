<template>
  <Accordion
    class="mb"
    :sub="true"
  >
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

    <template slot="sub">
      <div class="tablet-blobs">
        <div class="tablet-blob-1-4">
          <h6>
            Date
            <span
              v-if="etape.incertitudes && etape.incertitudes.date"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>{{ etape.date | dateFormat }}</p>
        </div>
        <div
          v-if="etape.duree"
          class="tablet-blob-1-4"
        >
          <h6>
            Durée
            <span
              v-if="etape.incertitudes && etape.incertitudes.duree"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>{{ etape.duree }} mois</p>
        </div>
        <div
          v-if="etape.dateDebut"
          class="tablet-blob-1-4"
        >
          <h6>
            Date de début
            <span
              v-if="etape.incertitudes && etape.incertitudes.dateDebut"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>{{ etape.dateDebut | dateFormat }}</p>
        </div>
        <div
          v-if="etape.dateFin"
          class="tablet-blob-1-4"
        >
          <h6>
            Date d'échéance
            <span
              v-if="etape.incertitudes && etape.incertitudes.dateFin"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>{{ etape.dateFin | dateFormat }}</p>
        </div>
        <div
          v-if="etape.points.length"
          class="tablet-blob-1-4"
        >
          <h6>
            Périmètre
            <span
              v-if="etape.incertitudes && etape.incertitudes.points"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>–</p>
        </div>
        <div
          v-if="etape.titulaires.length"
          class="tablet-blob-1-4"
        >
          <h6>
            Titulaire{{ etape.titulaires.length > 1 ? 's' : '' }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.titulaires"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <ul class="list-prefix">
            <li
              v-for="t in etape.titulaires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            </li>
          </ul>
        </div>
        <div
          v-if="etape.amodiataires.length"
          class="tablet-blob-1-4"
        >
          <h6>
            Amodiataire{{ etape.amodiataires.length > 1 ? 's' : '' }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.amodiataires"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>

          <ul class="list-prefix">
            <li
              v-for="t in etape.amodiataires"
              :key="t.id"
            >
              {{ etablissementNameFind(t.etablissements, etape.date) || t.nom }}
            </li>
          </ul>
        </div>
        <div
          v-if="etape.engagement"
          class="tablet-blob-1-4"
        >
          <h6>
            Engagement financier
            <span
              v-if="etape.incertitudes && etape.incertitudes.engagement"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>
            {{ numberFormat(etape.engagement) }}
            <span v-if="etape.engagementDevise"> {{ etape.engagementDevise.id }}</span>
          </p>
        </div>
        <div
          v-if="etape.volume"
          class="tablet-blob-1-4"
        >
          <h6>
            Volume
            <span
              v-if="etape.incertitudes && etape.incertitudes.volume"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <p>
            {{ numberFormat(etape.volume) }}
            <span v-if="etape.volumeUnite"> {{ etape.volumeUnite.nom }}</span>
          </p>
        </div>
        <div
          v-if="etape.substances.length"
          class="tablet-blob-1-2 large-blob-1-4"
        >
          <h6>
            Substance{{ etape.substances.length > 1 ? 's' : '' }}
            <span
              v-if="etape.incertitudes && etape.incertitudes.substances"
              class="bg-info py-xxs px-xs rnd-xs ml-xs color-bg"
            >?</span>
          </h6>
          <PillList :elements="etape.substances.map(s => s.nom)" />
        </div>
      </div>

      <div
        v-if="etape.visas && etape.visas.length"
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

      <p
        v-if="incertitudes"
        class="h5"
      >
        <span
          class="bg-info py-xxs px-xs rnd-xs color-bg bold"
        >?</span>&nbsp;: donnée incertaine
      </p>
    </template>

    <Documents
      v-if="etape.documents.length"
      :documents="etape.documents"
      class="px-m"
    />
  </Accordion>
</template>

<script>
import Dot from '../ui/dot.vue'
import Accordion from '../ui/accordion.vue'
import PillList from '../ui/pill-list.vue'
import Documents from './documents.vue'
import EditPopup from './etape-edit-popup.vue'
import RemovePopup from './etape-remove-popup.vue'

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
    incertitudes() {
      return (
        this.etape.incertitudes &&
        Object.keys(this.etape.incertitudes).reduce((res, i) => {
          if (this.etape.incertitudes[i] && i !== '__typename') {
            res++
          }
          return res
        }, 0)
      )
    }
  },

  methods: {
    editPopupOpen() {
      const etape = JSON.parse(JSON.stringify(this.etape))

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
        etape.groupes = etape.points.reduce((groupes, point) => {
          groupes[point.groupe - 1] = groupes[point.groupe - 1] || []
          groupes[point.groupe - 1][point.contour - 1] =
            groupes[point.groupe - 1][point.contour - 1] || []
          groupes[point.groupe - 1][point.contour - 1][point.point - 1] = {
            id: point.id,
            nom: point.nom,
            groupe: point.groupe,
            contour: point.contour,
            point: point.point,
            coordonnees: point.coordonnees,
            description: point.description,
            references: point.references
          }

          return groupes
        }, [])
      }

      if (!etape.incertitudes) {
        etape.incertitudes = {}
      }

      delete etape.pays
      delete etape.points
      delete etape.geojsonPoints
      delete etape.geojsonMultiPolygon
      delete etape.documents
      delete etape.emprises

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
